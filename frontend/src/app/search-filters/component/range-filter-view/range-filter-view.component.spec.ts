import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeFilterViewComponent } from './range-filter-view.component';

describe('RangeFilterViewComponent', () => {
  let component: RangeFilterViewComponent;
  let fixture: ComponentFixture<RangeFilterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeFilterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeFilterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
