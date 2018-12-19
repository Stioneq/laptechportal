import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormService} from "./service/form.service";
import {FilterService} from "./service/filter.service";

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapseAnimation', [
      state('1', style({height: '0', 'overflow-y': 'hidden'})),
      state('0', style({height: '*', 'overflow-y': 'hidden'})),
      transition('1 => 0', animate('200ms')),
      transition('0 => 1', animate('200ms'))
    ])]
})
export class SearchFiltersComponent implements OnInit, OnChanges {

  @Input() set filters(filters: any) {
    if (filters && filters.length > 0) {
      this._filters = filters;
      if (_.isEmpty(this._values)) {
        this._values = this.initValues({});
      }else{
        this.formState = this.initValues(this._values);
      }
      this.form = this.formService.convertFiltersToForm(filters, this._values);
    }
  }

  @Input() set values(values: any) {
    this._values = values;
    if (this.form) {
      this.form.reset(this._values);
    }
  }

  @Output('onSubmit') submitEmitter = new EventEmitter<any>();
  form: FormGroup;
  _values;
  _filters;
  private formState: any;
  hideFiltersMap = {};

  constructor(private formService: FormService, private filterService: FilterService) {
  }


  ngOnInit() {
  }

  private initValues(values: any) {
    return this._filters && this._filters.reduce((obj, param) => {
      if (values.hasOwnProperty(param.fieldName)) {
        obj[param.fieldName] = values[param.fieldName];
      } else {
        obj[param.fieldName] = this.filterService.getDefaultValue(param);
      }
      return obj;
    }, {});
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*  this.formState = this.filters.reduce((obj, param) => {
        if (param.value || param.value === '') {
          obj[param.fieldName] = param.value;
        }
        return obj;
      }, {});*/
    /*this.form.valueChanges.subscribe(res => { //TODO need to add this to track current state
      console.log(res);
    });*/
  }

  /**
   * Clear form
   */
  resetForm() {
    const emptyFilters = this._filters.reduce((obj, param) => {
      obj[param.fieldName] = this.filterService.getDefaultValue(param);
      return obj;
    }, {});

    this.form.reset(emptyFilters);
  }

  onSubmit(event) {
    event.preventDefault();
    this.submitEmitter.emit(this.form.value);
  }

  invertFilterVisibility(filter: any) {
    this.hideFiltersMap[filter.fieldName] = !this.hideFiltersMap[filter.fieldName];
  }

  formChanged() {
    return this.form && !_.isEqual(this.form.value, this._values);
  }

  /**
   * Revert form to current active filter
   */
  revertForm() {
    this.form.reset(this._values);
  }
}
