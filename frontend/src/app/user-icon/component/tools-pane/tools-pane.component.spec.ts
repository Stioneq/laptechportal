import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsPaneComponent } from './tools-pane.component';

describe('ToolsPaneComponent', () => {
  let component: ToolsPaneComponent;
  let fixture: ComponentFixture<ToolsPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
