import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedTableComponent } from './joined-table.component';

describe('JoinedTableComponent', () => {
  let component: JoinedTableComponent;
  let fixture: ComponentFixture<JoinedTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinedTableComponent]
    });
    fixture = TestBed.createComponent(JoinedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
