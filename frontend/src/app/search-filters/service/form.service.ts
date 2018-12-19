import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FilterType} from "../model/base-filter";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fb: FormBuilder) {
  }

  convertFiltersToForm(filters: any, values: any): FormGroup {
    const form = this.fb.group({});
    filters.forEach(filter => {
      let control;
      const value = values[filter.fieldName];
      switch(filter.type){
        case FilterType.TEXT:
          control = this.fb.control(value);
          break;
        case FilterType.RANGE:
          control = this.fb.control(
            {
              min: value.min,
              max: value.max
            }
          );
          break;
        case FilterType.LIST:
          control = this.fb.control(value);
          break;
      }
      form.addControl(filter.fieldName, control);
    });
    return form;
  }
}
