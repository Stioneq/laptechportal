import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxRxprogressModule} from 'ngx-rxprogress';
import {WidgetsModule} from '../widgets/widgets.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from '../toast/toast.module';
import {TooltipModule} from '../tooltip/tooltip.module';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalDialogsModule} from '../modal-dialogs/modal-dialogs.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  imports: [
    CommonModule,
    NgxRxprogressModule,
    WidgetsModule,
    ReactiveFormsModule,
    ToastModule,
    ModalDialogsModule,
    HttpClientModule,
    RouterModule,
    TooltipModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  exports: [
    CommonModule,
    ModalDialogsModule,
    NgxRxprogressModule,
    WidgetsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    TooltipModule
  ],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error();
    }

  }
}
