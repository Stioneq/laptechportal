import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartComponent} from './component/chart/chart.component';
import { RadarChartComponent } from './component/radar-chart/radar-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ChartComponent],
  declarations: [ChartComponent, RadarChartComponent]
})
export class ChartsModule {
}
