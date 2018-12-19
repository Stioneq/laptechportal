import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ignoreValues',
  pure: false
})
export class IgnoreValuesPipe implements PipeTransform {

  transform(value: any, ignoredValues: any[]): any {

    return value && value.filter(val => !ignoredValues.map(val2 => val2.title).includes(val.title));
  }

}
