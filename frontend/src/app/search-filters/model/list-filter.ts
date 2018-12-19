import {BaseFilter} from './base-filter';

export class ListFilter extends BaseFilter<List> {
  values?: any;
  api?: string;
}

export interface List {
  values: any[];
}
