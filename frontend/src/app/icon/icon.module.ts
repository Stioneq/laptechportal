import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './component/icon/icon.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [IconComponent],
  exports: [IconComponent]
})
export class IconModule { }
