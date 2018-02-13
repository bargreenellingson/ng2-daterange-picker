import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedRangeComponent } from './predefined-range.component';

describe('PredefinedRangeComponent', () => {
  let component: PredefinedRangeComponent;
  let fixture: ComponentFixture<PredefinedRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredefinedRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredefinedRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
