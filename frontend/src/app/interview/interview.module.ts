import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InterviewRoutingModule} from './interview-routing.module';
import {InterviewComponent} from './interview.component';
import {StoreModule} from '@ngrx/store';
import {interviewReducer} from '../core/store/interview/interview.reducer';
import {EffectsModule} from '@ngrx/effects';
import {InterviewEffects} from '../core/store/interview/interview.effects';
import {NgxRxprogressModule} from 'ngx-rxprogress';

@NgModule({
  imports: [
    CommonModule,
    NgxRxprogressModule,
    InterviewRoutingModule,
    StoreModule.forFeature('interview', interviewReducer),
    EffectsModule.forFeature([InterviewEffects])
  ],
  declarations: [InterviewComponent]
})
export class InterviewModule {
}
