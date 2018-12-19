import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './component/toast/toast.component';
import {ToastService} from './service/toast.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/**
 * Module for working with toast messages
 */
@NgModule({
  imports: [
    CommonModule, BrowserAnimationsModule
  ],
  providers: [ToastService],
  declarations: [ToastComponent],
  exports: [ToastComponent]
})
export class ToastModule { }
