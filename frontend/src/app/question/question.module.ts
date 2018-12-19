import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {QuestionListComponent} from './component/question-list/question-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TagComponent} from './component/tag/tag.component';
import {TagSelectorComponent} from './component/tag-selector/tag-selector.component';
import {IgnoreValuesPipe} from './pipe/ignore-values.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuestionComponent} from './component/question/question.component';
import {TimeAgoPipe} from '../pipe/timeago.pipe';
import {DetailedQuestionComponent} from './component/detailed-question/detailed-question.component';
import {QuillModule} from 'ngx-quill';
import {RatingComponent} from './component/rating/rating.component';
import {CommentComponent} from './component/comment/comment.component';
import {CommentListComponent} from './component/comment-list/comment-list.component';
import {IconModule} from '../icon/icon.module';
import {SearchFiltersModule} from '../search-filters/search-filters.module';
import {SideFilterPanelComponent} from './component/side-filter-panel/side-filter-panel.component';
import {QuestionFormComponent} from './component/question-form/question-form.component';
import {QuestionRoutingModule} from './question-routing.module';
import {QuestionContainerComponent} from './question-container.component';
import {NgxRxprogressModule} from 'ngx-rxprogress';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CoreModule,
    QuestionRoutingModule,
    QuillModule,
    SearchFiltersModule,
    IconModule,
  ],
  providers: [IgnoreValuesPipe, DatePipe],
  declarations: [QuestionFormComponent, TimeAgoPipe, QuestionListComponent,
    TagComponent, TagSelectorComponent, IgnoreValuesPipe,
    QuestionComponent, DetailedQuestionComponent,
    RatingComponent, CommentComponent, CommentListComponent, SideFilterPanelComponent, QuestionContainerComponent]
})
export class QuestionModule {
}
