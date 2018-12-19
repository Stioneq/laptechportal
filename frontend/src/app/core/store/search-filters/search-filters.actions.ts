import {Action} from '@ngrx/store';
import {BaseFilter} from '../../../search-filters/model/base-filter';

export enum SearchFiltersActionTypes {
  LOAD_FILTERS = '[SearchFilters] Load Filters',
  APPLY_FILTERS = '[SearchFilters] Apply filters',
  FILTERS_LOAD_SUCCESS = '[SearchFilters] Filters Load Success'
}

export class LoadFilters implements Action {
  readonly type = SearchFiltersActionTypes.LOAD_FILTERS;
}

export class ApplyFilters implements Action {
  readonly type = SearchFiltersActionTypes.APPLY_FILTERS;

  constructor(public filters: Map<string, any>) {

  }
}

export class FiltersLoadSuccess implements Action {
  readonly type = SearchFiltersActionTypes.FILTERS_LOAD_SUCCESS;

  constructor(public filters: BaseFilter<any>[]) {
  }
}

export type SearchFiltersActions = LoadFilters | FiltersLoadSuccess | ApplyFilters;
