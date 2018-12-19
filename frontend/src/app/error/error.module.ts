import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import {ErrorRoutingModule} from './error-routing.module';
import {ErrorsHandler} from './service/errors.handler';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler

    }
  ],
  declarations: [ErrorPageComponent]
})
export class ErrorModule { }
