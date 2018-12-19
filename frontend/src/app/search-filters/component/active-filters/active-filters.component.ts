import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AppState} from "../../../core/store";
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-active-filters',
  templateUrl: './active-filters.component.html',
  styleUrls: ['./active-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveFiltersComponent implements OnInit {
  appliedFilters: any[];

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.store
    .pipe(
      select(state => state.searchFilters.appliedFilters),
      map(filters => Object.keys(filters)
      .map(key => key))).subscribe(filters => {
        this.appliedFilters = filters;
        console.log(typeof filters);
        this.cd.detectChanges();
    });
  }


  private getFilterName(filter){

  }

}
