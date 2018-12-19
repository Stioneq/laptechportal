import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {ToastService} from '../toast/service/toast.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      this.toastService.sendErrorMessage('Error on request', `
<b>Requested url</b> = ${req.url}<br>
<b>Response status code</b> = ${err.status}<br>
<b>Message</b> = ${err.message};
      `);
      return throwError(err);
    }));
  }
}
