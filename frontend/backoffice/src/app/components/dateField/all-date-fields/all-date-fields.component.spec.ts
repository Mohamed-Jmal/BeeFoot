import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDateFieldsComponent } from './all-date-fields.component';

describe('AllDateFieldsComponent', () => {
  let component: AllDateFieldsComponent;
  let fixture: ComponentFixture<AllDateFieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDateFieldsComponent]
    });
    fixture = TestBed.createComponent(AllDateFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
