import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from '../../service/local-storage.service';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LoginRequest} from '../../../../types/auth';
import {getAuthUrl} from '../../util/url.util';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  authenticated$(): Observable<boolean> {
    return this.localStorageService.getValue$('token').pipe(map(v => !!v));
  }

  logout() {
    this.localStorageService.removeValue('token');
  }

  login(loginRequest: LoginRequest) {
    const headers = new HttpHeaders().append('Content-type', 'application/json');
    return this.http.post(getAuthUrl('login'), JSON.stringify(loginRequest), {
      headers: headers,
      responseType: 'text'
    }).pipe(tap(token => {
      this.localStorageService.putValue('token', token);
    }));
  }

  authenticated() {
    return !!this.localStorageService.getValue('token');
  }
}
