import { TestBed } from '@angular/core/testing';

import { EspaceServiceService } from './espace-service.service';

describe('EspaceServiceService', () => {
  let service: EspaceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspaceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
