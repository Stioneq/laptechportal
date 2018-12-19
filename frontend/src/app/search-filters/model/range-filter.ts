import {BaseFilter} from './base-filter';

export class RangeFilter extends BaseFilter<Range> {
  min: any;
  max: any;
  rangeType: string;
}

export interface Range {
  min: any;
  max: any;
}
