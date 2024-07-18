import { TestBed } from '@angular/core/testing';

import { EspaceResolverService } from './espace-resolver.service';

describe('EspaceResolverService', () => {
  let service: EspaceResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspaceResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
