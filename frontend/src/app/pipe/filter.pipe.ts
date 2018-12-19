import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterArg: any): any {
    console.log('Pipe applied');
    if (filterArg) {
      value = value.filter(filterArg);
    }
    return value;
  }

}
