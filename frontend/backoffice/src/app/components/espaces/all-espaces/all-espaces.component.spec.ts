import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEspacesComponent } from './all-espaces.component';

describe('AllEspacesComponent', () => {
  let component: AllEspacesComponent;
  let fixture: ComponentFixture<AllEspacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllEspacesComponent]
    });
    fixture = TestBed.createComponent(AllEspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
