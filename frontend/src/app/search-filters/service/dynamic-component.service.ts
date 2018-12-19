import {Injectable} from '@angular/core';
import {FilterType} from "../model/base-filter";
import {TextFilterViewComponent} from "../component/text-filter-view/text-filter-view.component";
import {RangeFilterViewComponent} from "../component/range-filter-view/range-filter-view.component";
import {ListFilterViewComponent} from "../component/list-filter-view/list-filter-view.component";

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {


  components: Map<string | FilterType, any> = new Map(
    Object.entries({
      TEXT: TextFilterViewComponent,
      RANGE: RangeFilterViewComponent,
      LIST: ListFilterViewComponent
    }));

  constructor() {
  }

  get(type: FilterType | string) {
    return this.components.get(type);
  }

  register(type, component) {
    this.components.set(type, component);
  }
}
