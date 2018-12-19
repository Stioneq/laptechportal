
export class BaseFilter<T> {
  label: string;
  type: FilterType;
  fieldName: string;
  value: T;
  order: number;
  meta?: any;
  required: boolean;


  constructor(label: string, type: FilterType, fieldName: string, value: T, order: number, meta: T, required: boolean) {
    this.label = label;
    this.type = type;
    this.fieldName = fieldName;
    this.value = value;
    this.order = order;
    this.meta = meta;
    this.required = required;
  }
}

export enum FilterType{
  TEXT = 'TEXT',
  RANGE = 'RANGE',
  LIST = 'LIST'
}
