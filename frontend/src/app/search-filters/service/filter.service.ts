import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {getApiUrl} from '../../util/url.util';
import {BaseFilter} from '../model/base-filter';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) {
  }


  getAvailableFilters(): Observable<BaseFilter<any>[]> {
    return this.http.get<BaseFilter<any>[]>(getApiUrl('questions/filters')).pipe(
      map(filters => filters.sort((f1, f2) => f1.order - f2.order))
    );
  }


  /**
   * Gets default value for each filter type
   * @param filter
   * @returns {any} default value for filter
   */
  getDefaultValue(filter: any) {
    switch (filter.type) {
      case 'RANGE':
        return {min: filter.min, max: filter.max};
      case 'LIST':
        return Object.keys(filter.values);
      case 'TEXT':
        return '';
    }
  }
}
