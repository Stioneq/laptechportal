import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFilterViewComponent } from './text-filter-view.component';

describe('TextFilterViewComponent', () => {
  let component: TextFilterViewComponent;
  let fixture: ComponentFixture<TextFilterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFilterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFilterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
