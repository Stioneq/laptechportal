import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {ChartsModule} from '../charts/charts.module';
import {ChartComponent} from '../charts/component/chart/chart.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
