import {FormGroup} from '@angular/forms';

export abstract class FilterView<T> {
  filter: T;
  form: FormGroup;
}
