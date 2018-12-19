import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-date-edit',
  templateUrl: './date-edit.component.html',
  styleUrls: ['./date-edit.component.scss']
})
export class DateEditComponent implements OnInit {
  @Input() min: Date;
  @Input() max: Date;
  @Input() value: { min: Date, max: Date };
  @Output() minValueChanged = new EventEmitter<Date>()
  @Output() maxValueChanged = new EventEmitter<Date>()
  @ViewChild('minInput') minInput: ElementRef;
  @ViewChild('maxInput') maxInput: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  onMinChanged($event: Event, value: any): void {
    value = Date.parse(value);
    if (Number.isNaN(value) || value > this.value.max || value < this.min) {
      $event.preventDefault();
      this.value.min = this.min;
      value = this.min;
    }
    this.minValueChanged.emit(value);
  }

  onMaxChanged($event: Event, value: any): void {
    value = Date.parse(value);
    if (Number.isNaN(value) || value < this.value.min || value > this.max) {
      $event.preventDefault();
      this.value.max = this.max;
      value = this.max;
    }
    this.maxValueChanged.emit(value);
  }

}
