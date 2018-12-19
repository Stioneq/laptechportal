import {Component, OnInit} from '@angular/core';
import {FilterView} from '../../model/filter-view';
import {BaseFilter} from '../../model/base-filter';

@Component({
  selector: 'app-text-filter-view',
  templateUrl: './text-filter-view.component.html',
  styleUrls: ['./text-filter-view.component.scss']
})
export class TextFilterViewComponent extends FilterView<BaseFilter<string>> implements OnInit {

  //TODO some problems if we use formControl instead of name after applying value is not updating. It looks like form changed
  constructor() {
    super();
  }

  ngOnInit() {


  }


  clearText() {
    console.log(this.form.get(this.filter.fieldName).value);
    this.form.get(this.filter.fieldName).setValue('');
  }
}
