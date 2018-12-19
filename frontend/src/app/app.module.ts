import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {QuestionModule} from './question/question.module';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './component/header/header.component';
import {HeaderMenuComponent} from './component/header-menu/header-menu.component';
import {ErrorHttpInterceptor} from './interceptor/error-http-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DashboardModule} from './dashboard/dashboard.module';
import {ChartsModule} from './charts/charts.module';
import {UserModule} from './user/user.module';
import {AuthInterceptor} from './interceptor/auth-interceptor.service';
import {FilterPipe} from './pipe/filter.pipe';
import {UserIconModule} from './user-icon/user-icon.module';
import {ErrorModule} from './error/error.module';
import {ScrollDirective} from './scroll.directive';
import {WidgetsModule} from './widgets/widgets.module';
import {CoreModule} from './core/core.module';
import {BlogModule} from './blog/blog.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderMenuComponent,
    FilterPipe,
    ScrollDirective
  ],
  imports: [
    BlogModule,
    QuestionModule,
    BrowserModule,
    ErrorModule,
    AppRoutingModule,
    CoreModule,
    DashboardModule,
    ChartsModule,
    UserModule,
    WidgetsModule,
    UserIconModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
