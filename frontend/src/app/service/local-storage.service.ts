import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  subject: ReplaySubject<any>;

  constructor() {
    this.subject = new ReplaySubject<any>(10);
    for (let i = 0; i < localStorage.length; i++) {

      const key = localStorage.key(i);
      this.subject.next([key, localStorage.getItem(key)]);

    }
  }


  putValue(key: string, value: string) {
    localStorage.setItem(key, value);
    this.subject.next([key, value]);

  }

  removeValue(key: string) {
    localStorage.removeItem(key);
    this.subject.next([key, null]);

  }

  getValue$(key: string): Observable<string> {
    return this.subject.pipe(filter(v => v[0] === key), map(v => v[1]));
  }

  getValue(key: string): string {
    return localStorage.getItem(key);
  }


}
