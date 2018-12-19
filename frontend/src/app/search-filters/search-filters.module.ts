import {NgModule} from '@angular/core';
import {SearchFiltersComponent} from './search-filters.component';
import {FilterViewDirective} from './directive/filter-view.directive';
import {TextFilterViewComponent} from './component/text-filter-view/text-filter-view.component';
import {RangeFilterViewComponent} from './component/range-filter-view/range-filter-view.component';
import {ActiveFiltersComponent} from './component/active-filters/active-filters.component';
import {CoreModule} from '../core/core.module';
import {ListFilterViewComponent} from './component/list-filter-view/list-filter-view.component';
import {MatButtonModule, MatChipsModule, MatListModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {SearchFiltersEffects, searchFiltersReducer} from '../core/store/search-filters';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  imports: [
    CoreModule,
    MatListModule,
    MatChipsModule,
    MatButtonModule,
    StoreModule.forFeature('searchFilters', searchFiltersReducer),
    EffectsModule.forFeature([SearchFiltersEffects])
  ],
  declarations: [SearchFiltersComponent, FilterViewDirective, TextFilterViewComponent, RangeFilterViewComponent, ActiveFiltersComponent, ListFilterViewComponent],
  exports: [SearchFiltersComponent, ActiveFiltersComponent],
  entryComponents: [TextFilterViewComponent, RangeFilterViewComponent, ListFilterViewComponent]
})
export class SearchFiltersModule {
}
