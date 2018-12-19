import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseFilter} from "../../model/base-filter";
import {FilterView} from "../../model/filter-view";
import {FormBuilder, FormControl} from "@angular/forms";
import {ListFilter} from "../../model/list-filter";
import {MatSelectionList} from "@angular/material";

@Component({
  selector: 'app-list-filter-view',
  templateUrl: './list-filter-view.component.html',
  styleUrls: ['./list-filter-view.component.scss']
})
export class ListFilterViewComponent extends FilterView<ListFilter> implements OnInit {
  @ViewChild('list') list: MatSelectionList;
  constructor() {
    super();
  }

  ngOnInit() {



  }

  selectAll(){
    this.list.selectAll();
  }

  deselectAll(){
    this.list.deselectAll();
  }

}
