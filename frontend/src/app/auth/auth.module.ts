import {NgModule} from '@angular/core';
import {AuthService} from './service/auth.service';
import {PermissionService} from './service/permission.service';
import {AuthGuard} from './guard/auth.guard';
import {CoreModule} from '../core/core.module';
import {AuthRoutingModule} from './auth-routing.module';
import {SocialLoginGuard} from "./guard/social-login.guard";

@NgModule({
  imports: [
    CoreModule,
    AuthRoutingModule
  ],
  declarations: [],
  providers: [AuthService, PermissionService, AuthGuard, SocialLoginGuard]
})
export class AuthModule {
}
