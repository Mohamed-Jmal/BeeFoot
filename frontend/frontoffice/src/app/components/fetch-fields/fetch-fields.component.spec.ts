import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchFieldsComponent } from './fetch-fields.component';

describe('FetchFieldsComponent', () => {
  let component: FetchFieldsComponent;
  let fixture: ComponentFixture<FetchFieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FetchFieldsComponent]
    });
    fixture = TestBed.createComponent(FetchFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
