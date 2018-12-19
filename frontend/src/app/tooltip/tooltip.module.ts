import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TooltipDirective} from './directive/tooltip.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TooltipDirective],
  exports: [TooltipDirective]
})
export class TooltipModule { }
