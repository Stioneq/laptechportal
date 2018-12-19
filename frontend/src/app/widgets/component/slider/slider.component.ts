import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Subject} from 'rxjs/index';
import {takeUntil} from 'rxjs/internal/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
  }]
})
export class SliderComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @ViewChild('slider1') slider1: ElementRef;
  @ViewChild('slider2') slider2: ElementRef;
  @ViewChild('minInput') minInput: ElementRef;
  @ViewChild('maxInput') maxInput: ElementRef;

  @Input() type = 'DECIMAL';
  @Input() min: any;
  @Input() max: any;
  @Input() cur: { min: any, max: any } = {min: this.min, max: this.max};
  values = [];
  width = 0;
  rangeLeft: number;
  rangeWidth: number;
  formGroup: FormGroup;
  private unsubscribe$ = new Subject();


  constructor(private fb: FormBuilder, private change: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.type === 'DATE') {
      this.min = Date.parse(this.min);
      this.max = Date.parse(this.max);
      this.cur = {min: Date.parse(this.cur.min), max: Date.parse(this.cur.max)};
    }
    if (this.min > this.max) {
      throw new Error('min should be less or equal than max');
    }
    this.values = [this.cur.min, this.cur.max];
    this.formGroup = this.fb.group({
      slider1: this.fb.control(this.toSliderValue(this.min),
        [
          Validators.required,
          Validators.min(this.min),
          Validators.max(this.max)
        ]),
      slider2: this.fb.control(this.toSliderValue(this.max),
        [
          Validators.required,
          Validators.min(this.min),
          Validators.max(this.max)
        ])
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.values[0] = this.toRealValue(res.slider1);
      this.values[1] = this.toRealValue(res.slider2);
      this.cur = {max: Math.max(...this.values), min: Math.min(...this.values)};
      this.updateValue();
      const sl1 = this.slider1.nativeElement;
      const w = sl1.offsetWidth || 0;
      this.rangeLeft = w * Math.min(res.slider1, res.slider2) / 100;
      this.rangeWidth = w * Math.max(res.slider1, res.slider2) / 100
        - this.rangeLeft;
      this.change.detectChanges();
    });

  }

  private updateValue() {
    if (this.type === 'DATE') {
      this.onChange({
        min: this.getDate(new Date(this.cur.min)),
        max: this.getDate(new Date(this.cur.max))
      });
    } else {
      this.onChange(this.cur);
    }
  }

  writeValue(obj: any): void {
    if (this.type === 'DATE') {
      obj = {min: Date.parse(obj.min), max: Date.parse(obj.max)};
    }
    this.cur = obj;
    if (obj) {
      this.formGroup.setValue({slider1: this.toSliderValue(obj.min), slider2: this.toSliderValue(obj.max)});
    }
    this.updateValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onChange = (val: any) => {
  }


  registerOnTouched(fn: any): void {
  }

  toSliderValue(val) {
    return 100 * (val - this.min) / (this.max - this.min);
  }

  toRealValue(val) {
    return (this.max - this.min) * val / 100 + this.min;
  }

  onMinChanged(value: any): void {
    const slider1 = this.formGroup.get('slider1');
    const slider1Value = slider1.value;
    const slider2 = this.formGroup.get('slider2');
    const slider2Value = slider2.value;
    console.log(value);
    if (slider1Value < slider2Value) {
      slider1.setValue(this.toSliderValue(value));
    } else {
      slider2.setValue(this.toSliderValue(value));
    }
  }

  onMaxChanged(value: any): void {
    const slider1 = this.formGroup.get('slider1');
    const slider1Value = slider1.value;
    const slider2 = this.formGroup.get('slider2');
    const slider2Value = slider2.value;
    console.log(value);
    if (slider1Value > slider2Value) {
      slider1.setValue(this.toSliderValue(value));
    } else {
      slider2.setValue(this.toSliderValue(value));
    }
  }

  getDate(date: Date) {

    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    const dd = date.getDate().toString();

    return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
