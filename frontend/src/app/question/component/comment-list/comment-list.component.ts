import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { concat, Observable, Subject } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastService } from '../../../toast/service/toast.service';
import { UserIconService } from '../../../user/service/user-icon.service';
import {
  finalize,
  map,
  mergeMapTo,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/internal/operators';
import { Comment } from '../../model/comment';
import { UserService } from '../../../user/service/user.service';
import { User } from '../../../user/model/user';
import { ProgressRegistryService } from 'ngx-rxprogress';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {
  @Output() commentAdded = new EventEmitter();
  @Output() commentRemoved = new EventEmitter();

  addCommentControl: FormControl;
  @Input() questionId;
  comments: Comment[];
  submitting = false;
  addCommentProgressId = 'add-comment-progress-id';
  private unsubscribe$: Subject<void> = new Subject<void>();
  authenticated$: Observable<boolean>;
  currentUser: any;

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private progressRegistry: ProgressRegistryService,
    private userService: UserService,
    private toast: ToastService,
    private userIconService: UserIconService
  ) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.authenticated$ = this.userService.isAuthenticated$();
    this.authenticated$
      .pipe(
        mergeMapTo(this.userService.getUser$()),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(user => {
        this.currentUser = user;
      });
    this.addCommentControl = this.fb.control('', [
      Validators.required,
      Validators.minLength(10)
    ]);
    this.commentService
      .getComments(this.questionId)
      .pipe(
        map(result => result.comments),
        tap(result => (this.comments = result)),
        switchMap(cs => {
          const authors = new Set<string>(cs.map(c => c.author));
          return concat(
            ...Array.from(authors).map(author =>
              this.userIconService.getCachedValue(author).pipe(
                map(icon => ({
                  icon: icon,
                  author: author
                }))
              )
            )
          );
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(res => {
        this.updateIconsForAuthor(res);
      });
  }

  addComment() {
    this.submitting = true;
    this.progressRegistry
      .register(
        this.addCommentProgressId,
        this.commentService.addComment(this.questionId, {
          text: this.addCommentControl.value
        })
      )
      .pipe(
        switchMap(res => {
          return this.userIconService
            .getCachedValue(res.author)
            .pipe(map(iconRes => Object.assign({}, res, { icon: iconRes })));
        }),
        finalize(() => (this.submitting = false)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(res => {
        this.comments.unshift(res);
        this.commentAdded.emit(null);
        this.toast.sendSuccessMessage(
          'Comment was added',
          'Comment text: ' + this.addCommentControl.value
        );
        this.addCommentControl.setValue('');
      });
  }

  deleteComment(event: string, index: number) {
    this.commentService
      .deleteComment(this.questionId, event)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.commentRemoved.emit(null);
        this.comments.splice(index, 1);
      });
  }

  editComment(event: Comment) {
    this.commentService
      .editComment(this.questionId, event)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        const comment = this.comments.filter(c => c.id === res.id);
        if (comment && comment.length > 0) {
          comment[0].text = res.text;
        }
      });
  }

  private updateIconsForAuthor(res: { icon: string; author: string }) {
    this.comments
      .filter(q => q.author === res.author)
      .forEach(q => {
        q.icon = res.icon;
      });
  }

  isCommentAuthor(user: User | null, author: string | any): boolean {
    return user && user.username && user.username === author;
  }
}
