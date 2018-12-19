import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QuestionListComponent} from './component/question-list/question-list.component';
import {DetailedQuestionComponent} from './component/detailed-question/detailed-question.component';
import {QuestionFormComponent} from './component/question-form/question-form.component';
import {QuestionContainerComponent} from './question-container.component';


const routes: Routes = [
  {
    path: 'questions', component: QuestionContainerComponent, children: [
    {path: '', component: QuestionListComponent, pathMatch: 'full'},
    {path: 'form', component: QuestionFormComponent},
    {path: ':id', component: DetailedQuestionComponent},
  ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class QuestionRoutingModule {
}
