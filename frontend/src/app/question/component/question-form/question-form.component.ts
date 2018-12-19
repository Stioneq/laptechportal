import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../service/question.service';
import {ToastService} from '../../../toast/service/toast.service';
import {Tag} from '../../model/tag';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../user/service/user.service';
import {finalize} from 'rxjs/internal/operators';
import {Question} from '../../model/question';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Location} from '@angular/common';
import {COLLAPSE_ANIMATION} from '../../../util/animation.util';
import {ProgressRegistryService} from 'ngx-rxprogress';
import * as _ from 'lodash';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  animations: [
    COLLAPSE_ANIMATION
  ],
})
export class QuestionFormComponent implements OnInit, OnChanges, OnDestroy {
  private question: any = {
    id: '',
    title: '',
    question: '',
    answer: '',
    tags: []
  };
  form: FormGroup;
  questionFormProgressId = 'question-form-progress';
  submiting = false;
  formTitle = '';
  private questionId;
  private unsubscribe$: Subject<void> = new Subject<void>();
  submitText = '';

  constructor(private fb: FormBuilder, private userService: UserService,
              private q: QuestionService, private toastService: ToastService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private progressRegistry: ProgressRegistryService,
              private location: Location) {
  }

  ngOnInit() {
    const id = this.questionId = this.activatedRoute.snapshot.queryParams.id;
    if (id) {
      this.formTitle = 'Edit question';
      this.submitText = 'Edit';
      this.progressRegistry.register(this.questionFormProgressId, this.q.getQuestion(id).pipe(
        takeUntil(this.unsubscribe$))).subscribe((q) => this.initQuestion(q));
    } else {
      this.formTitle = 'Add question';
      this.submitText = 'Add';
    }
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      question: ['', Validators.required],
      answer: ['', Validators.required],
      tags: [[]],
      id: ''
    });
  }

  submitQuestion() {
    if (this.questionId) {
      this.editQuestion();
    } else {
      this.addQuestion();
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.rebuildForm();
  }

  rebuildForm() {
    // it is necessary to clone question in order to prevent mutation
    this.form.reset(_.cloneDeep(this.question));
  }

  onAddTag(tag: Tag) {
    (<FormArray>this.form.controls['tags']).value.push(new FormControl(tag));
  }

  onRemoveTag(index) {
    this.form.controls['tags'].value.removeAt(index);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private editQuestion() {
    const user = this.userService.isAuthenticated() && this.userService.getUser();
    if (user && user.username) {
      this.submiting = true;
      this.progressRegistry.register(this.questionFormProgressId, this.q.editQuestion(
        this.form.value).pipe(finalize(() => this.submiting = false)))
        .subscribe(res => this.onSuccessfullyEdit(), err => {
          console.log('error on editing');
        });
    }
  }

  private onSuccessfullyEdit() {
    this.toastService.sendSuccessMessage('title', 'question successfully edit:'
      + JSON.stringify(this.form.value));
    this.location.back();
  }

  private addQuestion() {
    this.submiting = true;
    this.progressRegistry.register(this.questionFormProgressId, this.q.addQuestion(this.form.value)
      .pipe(finalize(() => this.submiting = false)))
      .subscribe(res => this.onSuccessfullyAdd(res), err => {
        console.log('error on adding');
      });
  }

  private onSuccessfullyAdd(res: any) {
    this.toastService.sendSuccessMessage('title', 'new question added:' + JSON.stringify(this.form.value));
    this.router.navigate(['/questions']);
  }

  private initQuestion(q: Question) {
    this.question = q;
    this.rebuildForm();
  }
}
