import {Action} from '@ngrx/store';
import {BaseFilter} from '../../../search-filters/model/base-filter';
import {SearchFiltersActions, SearchFiltersActionTypes} from "./search-filters.actions";


export interface SearchFiltersState {
  filters: BaseFilter<any>[];
  appliedFilters: any;
}

export const initialState: SearchFiltersState = {
  filters: [],
  appliedFilters: {}

};

export function searchFiltersReducer(state = initialState, action: SearchFiltersActions): SearchFiltersState {
  switch (action.type) {
    case SearchFiltersActionTypes.FILTERS_LOAD_SUCCESS:
      return {...state, filters: action.filters};
    case SearchFiltersActionTypes.APPLY_FILTERS:
      return {...state, appliedFilters: action.filters};
    default:
      return state;
  }
}

/**
 * Gets default value for each filter type
 * @param filter
 * @returns {any} default value for filter
 */
function getDefaultValue(filter: any) {
  switch (filter.type) {
    case 'RANGE':
      return {min: filter.min, max: filter.max};
    case 'LIST':
      return Object.keys(filter.values);
    case 'TEXT':
      return '';
  }
}


