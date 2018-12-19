import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {FiltersLoadSuccess, SearchFiltersActionTypes} from './search-filters.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/internal/operators';
import {FilterService} from '../../../search-filters/service/filter.service';
import {AppState} from '../app.state';
import {select, Store} from '@ngrx/store';


@Injectable()
export class SearchFiltersEffects {

  @Effect()
  getFilters$ = this.actions$
    .pipe(
      ofType(SearchFiltersActionTypes.LOAD_FILTERS),
      switchMap(() => this.filterService.getAvailableFilters()),
      map((filters) => {
        return new FiltersLoadSuccess(filters);
      }));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private filterService: FilterService) {
  }




}
