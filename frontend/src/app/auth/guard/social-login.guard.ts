import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PermissionService} from '../service/permission.service';
import {UserService} from '../../user/service/user.service';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class SocialLoginGuard implements CanActivate {

  constructor(private permissionService: PermissionService,
              private userService: UserService, private router: Router,
              private httpClient: HttpClient) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const code = route.queryParams['code'];
    this.httpClient.get('http://google.com').subscribe(
        res => res);
    return true;
  }

}
