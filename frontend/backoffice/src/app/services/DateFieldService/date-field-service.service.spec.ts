import { TestBed } from '@angular/core/testing';

import { DateFieldServiceService } from './date-field-service.service';

describe('DateFieldServiceService', () => {
  let service: DateFieldServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFieldServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
