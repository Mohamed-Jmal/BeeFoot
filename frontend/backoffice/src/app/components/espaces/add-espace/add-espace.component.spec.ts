import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEspaceComponent } from './add-espace.component';

describe('AddEspaceComponent', () => {
  let component: AddEspaceComponent;
  let fixture: ComponentFixture<AddEspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEspaceComponent]
    });
    fixture = TestBed.createComponent(AddEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
