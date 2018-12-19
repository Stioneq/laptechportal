import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, filter, tap} from 'rxjs/internal/operators';
import {getBase64Decoded} from '../../util/base64.util';
import {map} from 'rxjs/operators';
import {GetIconResponse} from '../../../../types/auth';
import {UserIcon} from '../model/user-icon';
import {getApiUrl, getAuthUrl, getServerUrl} from '../../util/url.util';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class UserIconService {
  private default_ttl = 60000;
  iconsCache: Map<string, UserIcon> = new Map<string, UserIcon>();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  cache(key: string, value: any) {

    this.iconsCache.set(key, {icon: value, ttl: this.default_ttl, createdAt: new Date()});
  }

  getCachedValue(key: string): Observable<any> {
    if (this.iconsCache.has(key)) {
      console.log('Get cached value for ' + key);
      const icon = this.iconsCache.get(key);
      if (this.isExpired(icon)) {
        this.iconsCache.delete(key);
        console.log('delete from cache');
      } else {
        return of(this.iconsCache.get(key).icon);
      }

    }
    return this.http.get(getServerUrl('files', 'images', key), {responseType: 'blob'})
      .pipe(
        map(res => {
          if (res.size > 0) {
            return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res));
          } else {
            return './assets/img/user_icon.png';
          }
        }),
        catchError(err => of(err)), tap(icon => this.cache(key, icon)));
  }

  private isExpired(icon: UserIcon) {
    return icon.ttl && new Date().getTime() > icon.createdAt.getTime() + icon.ttl;
  }
}
