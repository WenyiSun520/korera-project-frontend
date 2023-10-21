import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitySurveyTableComponent } from './quantity-survey-table.component';

describe('QuantitySurveyTableComponent', () => {
  let component: QuantitySurveyTableComponent;
  let fixture: ComponentFixture<QuantitySurveyTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuantitySurveyTableComponent]
    });
    fixture = TestBed.createComponent(QuantitySurveyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
