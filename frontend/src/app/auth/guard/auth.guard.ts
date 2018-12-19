import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PermissionService} from '../service/permission.service';
import {UserService} from '../../user/service/user.service';
import {filter, map, take, takeLast, tap} from 'rxjs/internal/operators';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private permissionService: PermissionService,
              private userService: UserService, private router: Router) {

  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const acceptableRoles = this.permissionService.getAcceptableRoles(route.path);
    return this.userService.requestUser().pipe(
      map(user => {
        return user && user.roles.filter(role => acceptableRoles.includes(role)).length > 0;
      }),
      tap(res => {
        if (!res) {
          this.router.navigate(['blog']);
        }
      })
    )
      ;
  }
}
