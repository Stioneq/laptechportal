import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/component/dashboard/dashboard.component';
import {RadarChartComponent} from './charts/component/radar-chart/radar-chart.component';
import {CheckModalGuard} from './modal-dialogs/guard/check-modal.guard';
import {ErrorPageComponent} from './error/component/error-page/error-page.component';
import {AuthModule} from './auth/auth.module';
import {AuthGuard} from './auth/guard/auth.guard';


const routes: Routes = [
  {
    path: '', canActivateChild: [CheckModalGuard], children: [
    {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},
    {path: 'charts', component: RadarChartComponent, data: {title: 'Charts'}},
    {
      path: 'interview', loadChildren: './interview/interview.module#InterviewModule',
      canLoad: [AuthGuard]
    },
    {path: 'error', component: ErrorPageComponent, data: {title: 'Error'}},
    {path: '**', redirectTo: '/blog'}
  ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule {
}
