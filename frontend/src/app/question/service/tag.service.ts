import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {getApiUrl, getServerUrl} from '../../util/url.util';
import {Tag} from '../model/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
  }


  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(getApiUrl('tags'));
  }

  searchTags(search: string): Observable<Tag[]> {
    if (search !== '') {
      const params = new HttpParams().set('q', search);
      return this.http.get<Tag[]>(getServerUrl('tags'), {params: params});
    }
    return of([]);
  }
}
