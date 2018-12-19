import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnInit, OnChanges {
  @Input('max') max = 5;
  placeholders: number[] = [];
  @Input('current') current = 0;
  @Output('change') change: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
    this.placeholders = Array(this.max).fill(0);
  }

  ngOnChanges() {
    this.placeholders = Array(this.max).fill(0);
  }

  changed($event, i: number) {
    $event.stopPropagation();
    let current;
    if (this.current === this.max - i) {
      current = 0;
    } else {
      current = this.max - i;
    }
    this.change.emit(current);
  }
}
