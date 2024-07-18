import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosActiviteComponent } from './nos-activite.component';

describe('NosActiviteComponent', () => {
  let component: NosActiviteComponent;
  let fixture: ComponentFixture<NosActiviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NosActiviteComponent]
    });
    fixture = TestBed.createComponent(NosActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
