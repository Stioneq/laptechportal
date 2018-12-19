import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-number-edit',
  templateUrl: './number-edit.component.html',
  styleUrls: ['./number-edit.component.scss']
})
export class NumberEditComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() value: { min: number, max: number };
  @Output() minValueChanged = new EventEmitter<number>()
  @Output() maxValueChanged = new EventEmitter<number>()
  @ViewChild('minInput') minInput: ElementRef;
  @ViewChild('maxInput') maxInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  onMinChanged($event: Event, value: any): void {
    value = +value;
    if (value > +this.maxInput.nativeElement.value || value < this.min) {
      $event.preventDefault();
      this.minInput.nativeElement.value = this.min;
      value = this.min;
    }
    this.minValueChanged.emit(value);
  }

  onMaxChanged($event: Event, value: any): void {
    value = +value;
    if (value < this.minInput.nativeElement.value || value > this.max) {
      $event.preventDefault();
      this.maxInput.nativeElement.value = this.max;
      value = this.max;
    }
    this.maxValueChanged.emit(value);
  }


}
