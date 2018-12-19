import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {AuthService} from '../../auth/service/auth.service';
import {HttpClient} from '@angular/common/http';
import {map, retry, switchMap, tap} from 'rxjs/operators';
import {GetUserResponse} from '../../../../types/auth';
import {UserIconService} from './user-icon.service';
import {getApiUrl, getAuthUrl, getServerUrl} from '../../util/url.util';
import {retryWhen} from "rxjs/internal/operators";

@Injectable()
export class UserService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient, private authService: AuthService, private iconService: UserIconService) {
  }

  public isAuthenticated$(): Observable<boolean> {
    return this.authService.authenticated$();
  }

  public isAuthenticated(): boolean {
    return this.authService.authenticated();
  }

  public requestUser(): Observable<User> {
    return this.http.get<User>(getServerUrl('user')).pipe( //TODO add retrywhen some time
      switchMap(u => this.iconService.getCachedValue(u.username)
        .pipe(
          map(icon => {
            u.icon = icon;
            return u;
          }))),
      tap(u => this.setUser(u)));
  }

  public setUser(user: User) {
    this.userSubject.next(user);
  }

  public getUser$(): Observable<User> {
    return this.userSubject;
  }

  public getUser(): User {
    return this.userSubject.getValue();
  }

}
