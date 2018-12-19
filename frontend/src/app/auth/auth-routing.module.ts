import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SocialLoginGuard} from './guard/social-login.guard';
import {LoginComponent} from '../user/component/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [SocialLoginGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
