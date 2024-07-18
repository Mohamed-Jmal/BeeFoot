import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDateFieldComponent } from './add-date-field.component';

describe('AddDateFieldComponent', () => {
  let component: AddDateFieldComponent;
  let fixture: ComponentFixture<AddDateFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDateFieldComponent]
    });
    fixture = TestBed.createComponent(AddDateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
