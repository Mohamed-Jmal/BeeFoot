import { TestBed } from '@angular/core/testing';

import { FieldResolverService } from './field-resolver.service';

describe('FieldResolverService', () => {
  let service: FieldResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
