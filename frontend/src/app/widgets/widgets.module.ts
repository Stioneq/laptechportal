import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderComponent} from './component/slider/slider.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DateEditComponent } from './component/slider/date-edit/date-edit.component';
import { NumberEditComponent } from './component/slider/number-edit/number-edit.component';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [SliderComponent, DateEditComponent, NumberEditComponent],
  exports: [SliderComponent]
})
export class WidgetsModule {
}
