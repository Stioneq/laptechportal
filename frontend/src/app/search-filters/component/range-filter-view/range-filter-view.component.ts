import {Component, Input, OnInit} from '@angular/core';
import {FilterView} from '../../model/filter-view';
import {Range, RangeFilter} from '../../model/range-filter';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-range-filter-view',
  templateUrl: './range-filter-view.component.html',
  styleUrls: ['./range-filter-view.component.scss']
})
export class RangeFilterViewComponent extends FilterView<RangeFilter> implements OnInit {

  constructor(private fb: FormBuilder) {
    super();
  }


  ngOnInit() {

  }
}
