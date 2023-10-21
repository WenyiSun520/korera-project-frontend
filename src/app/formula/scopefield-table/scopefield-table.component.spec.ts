import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopefieldTableComponent } from './scopefield-table.component';

describe('ScopefieldTableComponent', () => {
  let component: ScopefieldTableComponent;
  let fixture: ComponentFixture<ScopefieldTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScopefieldTableComponent]
    });
    fixture = TestBed.createComponent(ScopefieldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
