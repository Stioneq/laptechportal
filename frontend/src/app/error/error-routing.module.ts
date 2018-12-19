import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorPageComponent} from './component/error-page/error-page.component';
import {Route, RouterModule} from "@angular/router";

const ROUTES: Route[] = [{
  path: 'error', component: ErrorPageComponent
}];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]

})
export class ErrorRoutingModule {

}
