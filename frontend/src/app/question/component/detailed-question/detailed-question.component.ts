import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../service/question.service';
import {UserIconService} from '../../../user/service/user-icon.service';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Question} from '../../model/question';
import {User} from '../../../user/model/user';
import {UserService} from '../../../user/service/user.service';
import {mergeMapTo} from 'rxjs/internal/operators';
import {ToastService} from '../../../toast/service/toast.service';
import {FormGroup} from '@angular/forms';
import {ProgressRegistryService} from 'ngx-rxprogress';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detailed-question',
  templateUrl: './detailed-question.component.html',
  styleUrls: ['./detailed-question.component.scss']
})
export class DetailedQuestionComponent implements OnInit, OnDestroy {
  @Input() showRatingChange: boolean;
  data: Question;
  detailedQuestionProgressId = 'detailed-question-progress';
  authenticated$: Observable<boolean>;
  currentUser: User;
  ratingUpdating = false;
  detailedQuestionRatingProgressId = 'detailed-question-rating-progress';
  form: FormGroup;
  isShowComments = false;
  private unsubscribe$ = new Subject();

  constructor(private q: QuestionService, private activateRoute: ActivatedRoute,
              private iconService: UserIconService,
              private progressRegistry: ProgressRegistryService,
              private userService: UserService,
              private toast: ToastService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {

    this.authenticated$ = this.userService.isAuthenticated$();
    this.authenticated$.pipe(mergeMapTo(this.userService.getUser$()), takeUntil(this.unsubscribe$)).subscribe(user => {
      this.currentUser = user;
    });
    const id = this.activateRoute.snapshot.params.id;
    if (id) {
      this.progressRegistry.register(this.detailedQuestionProgressId, this.q.getQuestion(id).pipe(
        tap(q => this.initQuestion(q)),
        switchMap(q => this.iconService.getCachedValue(q.author)),
        takeUntil(this.unsubscribe$))).subscribe((icon) => this.data.icon = icon);
    }
  }

  private initQuestion(q: Question) {
    this.data = q;
  }

  /**
   * Invokes when question is deleted
   * @param id
   */
  onQuestionDelete(id) {
    this.q.deleteQuestion(id).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => this.router.navigate(['/questions']))).subscribe(() => {
      this.toast.sendInfoMessage('Question deleted', 'Question was deleted successfully ' + id);
    });
  }

  onRatingChanged(event, id) {
    this.ratingUpdating = true;
    this.progressRegistry.register(this.detailedQuestionRatingProgressId, this.q.rateQuestion(id, event, this.userService.getUser().username))
      .subscribe((res) => {
        this.ratingUpdating = false;
        this.data.rating = res.rating;
        this.data.userRating = event;
        this.toast.sendInfoMessage('Question rated', 'Question ' + id + ' was rated successfully. New rating' + res.rating);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  isQuestionAuthor(user: User | null, author: string | any): boolean {
    return user && user.username && user.username === author;
  }

  isAuthenticatedAndNotAuthor(user: User | null, author: string | any): boolean {
    return user && user.username && user.username !== author;
  }

  onQuestionEdit(id: string) {
    this.router.navigate(['../form'], {
      relativeTo: this.activateRoute,
      queryParams: {id: this.data.id}
    });
  }

  showComments() {
    this.isShowComments = !this.isShowComments;
  }

  decreaseCommentsCount() {
    this.data.comments--;
  }

  increaseCommentsCount() {
    this.data.comments++;
  }

  back() {
    this.location.back();
  }
}
