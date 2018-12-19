import {InterviewState} from './interview';
import {SearchFiltersState} from './search-filters';

export interface AppState {
  interview: InterviewState;
  searchFilters: SearchFiltersState;
}



