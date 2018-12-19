import {NgModule} from '@angular/core';
import {UserInfoComponent} from './component/user-info/user-info.component';
import {UserMenuComponent} from './component/user-menu/user-menu.component';
import {UserService} from './service/user.service';
import {LoginComponent} from './component/login/login.component';
import {UserIconModule} from '../user-icon/user-icon.module';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CoreModule,
    UserIconModule
  ],
  providers: [UserService],
  exports: [UserInfoComponent],
  declarations: [UserInfoComponent, UserMenuComponent, LoginComponent]
})
export class UserModule {
}
