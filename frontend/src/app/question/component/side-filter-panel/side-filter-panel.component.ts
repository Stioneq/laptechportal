import {AfterViewInit, Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ModalService} from '../../../modal-dialogs/service/modal.service';
import {AppState} from '../../../core/store/app.state';
import {select, Store} from '@ngrx/store';
import {ApplyFilters, LoadFilters} from '../../../core/store/search-filters';

export const SIDE_FILTER_PANEL_ID = 'side-panel';

@Component({
  selector: 'app-side-filter-panel',
  templateUrl: './side-filter-panel.component.html',
  styleUrls: ['./side-filter-panel.component.scss'],
  animations: [
    trigger('toggleAnimation', [
      transition(':enter', [
        query('.search-pane', [
          style({'transform': 'translateX(100%)'}),
          animate('500ms ease', style({'transform': 'translateX(0)'}))
        ], {optional: true})

      ]),
      transition(':leave', [
        query('.search-pane', [
          animate('500ms ease', style({'transform': 'translateX(100%)'}))
        ], {optional: true})

      ])

    ])]
})
export class SideFilterPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('@toggleAnimation') toggleAnimation;
  filters$: Observable<any>;
  values$: Observable<any>;
  unsubscribe$: Subject<void> = new Subject<void>();
  filterProgressId = 'filters-load-progress-id';


  constructor(private router: Router
    , private modalService: ModalService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadFilters());
    // this.progressRegistry.register(this.filterProgressId,
    this.filters$ = this.store.pipe(select(store => store.searchFilters.filters));
    this.values$ = this.store.pipe(select(store => store.searchFilters.appliedFilters));
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  hide() {
    this.modalService.hideModal(SIDE_FILTER_PANEL_ID);
  }


  ngAfterViewInit(): void {
  }

  applyFilter(filters: any): void {
    this.store.dispatch(new ApplyFilters(filters));
    this.router.navigate(['questions'], {
      queryParams:
        {q: btoa(encodeURIComponent(JSON.stringify(filters)))}
    })
      .then((() => {
        this.hide();
      }));
  }


}
