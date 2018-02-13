import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateinputComponent } from './dateinput.component';

describe('DateinputComponent', () => {
  let component: DateinputComponent;
  let fixture: ComponentFixture<DateinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
