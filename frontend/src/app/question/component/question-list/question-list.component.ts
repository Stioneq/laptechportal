import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, Observable, Subject } from 'rxjs';
import { QuestionPreview } from '../../model/question-preview';
import { QuestionService } from '../../service/question.service';
import { UserIconService } from '../../../user/service/user-icon.service';
import {
  distinctUntilChanged,
  map,
  mergeMapTo,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/internal/operators';
import { UserService } from '../../../user/service/user.service';
import { User } from '../../../user/model/user';
import { ToastService } from '../../../toast/service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  animate,
  group,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';
import { ModalService } from '../../../modal-dialogs/service/modal.service';
import { SIDE_FILTER_PANEL_ID } from '../side-filter-panel/side-filter-panel.component';
import { ProgressRegistryService } from 'ngx-rxprogress';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { ApplyFilters } from '../../../core/store/search-filters/search-filters.actions';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* <=> *', [
        group([
          query(
            ':enter',
            [
              style({ opacity: 0 }),
              stagger(100, [animate('500ms linear', style({ opacity: 1 }))])
            ],
            { optional: true }
          )
        ])
      ]),
      transition('* <=> *', [
        group([
          animate('500ms ease', style({ opacity: 1 })),
          query(
            ':exit',
            [
              style({ opacity: 1 }),
              stagger(100, [animate('500ms ease', style({ opacity: 0 }))])
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: QuestionPreview[];
  currentUser$: Observable<User>;
  authenticated$: Observable<boolean>;
  private unsubscribe$ = new Subject();
  questionLoadProgressId = 'question-progress';
  filtersModalId: string = SIDE_FILTER_PANEL_ID;

  constructor(
    private q: QuestionService,
    public modalService: ModalService,
    private userIconService: UserIconService,
    private userService: UserService,
    private toast: ToastService,
    public progressRegistry: ProgressRegistryService,
    private router: Router,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authenticated$ = this.userService.isAuthenticated$();
    this.currentUser$ = this.authenticated$.pipe(
      mergeMapTo(this.userService.getUser$())
    );
    this.readFiltersFromParams();
    this.loadQuestions();
  }

  /**
   * If filters were passed as the query params, decode it and apply
   */
  private readFiltersFromParams() {
    const params = this.activatedRoute.snapshot.queryParams;
    let curFilters: any = {};
    if (params.q) {
      curFilters = JSON.parse(decodeURIComponent(atob(params.q)));
    }
    this.store.dispatch(new ApplyFilters(curFilters));
  }

  private loadQuestions() {
    return this.store
      .pipe(
        select(state => state.searchFilters.appliedFilters),
        takeUntil(this.unsubscribe$),
        distinctUntilChanged(),
        switchMap(filters =>
          this.progressRegistry.register(
            this.questionLoadProgressId,
            this.q.getQuestions(filters).pipe(
              map(result => result.questions),
              tap(result => {
                this.questions = result;
              }),
              switchMap(qs => {
                const authors = new Set<string>(qs.map(q => q.author));
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
              })
            )
          )
        )
      )
      .subscribe(res => [this.updateIconsForAuthor(res)]);
  }

  private updateIconsForAuthor(res: { icon: string; author: string }) {
    this.questions
      .filter(q => q.author === res.author)
      .forEach(q => {
        q.icon = res.icon;
      });
  }

  /**
   * Invokes when question is deleted
   * @param id
   */
  onQuestionDelete(id) {
    this.q
      .deleteQuestion(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.questions = this.questions.filter(q => q.id !== id);
        this.toast.sendInfoMessage(
          'Question deleted',
          'Question was deleted successfully ' + id
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onRatingChanged(event, id) {
    this.q
      .rateQuestion(id, event, this.userService.getUser().username)
      .subscribe(res => {
        const question = this.questions.filter(q => q.id === id);
        if (question && question.length > 0) {
          question[0].rating = res.rating;
          question[0].userRating = event;
        }
        this.toast.sendInfoMessage(
          'Question rated',
          'Question ' + id + ' was rated successfully. New rating ' + res.rating
        );
      });
  }

  isQuestionAuthor(user: User | null, author: string | any): boolean {
    return user && user.username && user.username === author;
  }

  isAuthenticatedAndNotAuthor(
    user: User | null,
    author: string | any
  ): boolean {
    return user && user.username && user.username !== author;
  }

  onQuestionEdit(id: string) {
    this.router.navigate(['form'], {
      relativeTo: this.activatedRoute,
      queryParams: { id: id }
    });
  }
}
