import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedQuestionComponent } from './detailed-question.component';

describe('DetailedQuestionComponent', () => {
  let component: DetailedQuestionComponent;
  let fixture: ComponentFixture<DetailedQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
