import { TestBed } from '@angular/core/testing';

import { FieldImageService } from './field-image.service';

describe('FieldImageService', () => {
  let service: FieldImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
