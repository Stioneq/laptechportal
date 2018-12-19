import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {ToastService} from '../toast/service/toast.service';
import {LocalStorageService} from '../service/local-storage.service';
import {empty} from 'rxjs/internal/Observer';
import {catchError} from 'rxjs/operators';
const TOKEN = 'token';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getValue(TOKEN);
    const newReq = token && req.clone({headers: req.headers.set('Authorization', `BEARER ${token}`)}) || req;
    return next.handle(newReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        this.localStorageService.removeValue(TOKEN);
      }
      return throwError(err);
    }));
  }
}
