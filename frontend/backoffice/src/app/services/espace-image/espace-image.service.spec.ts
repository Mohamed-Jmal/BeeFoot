import { TestBed } from '@angular/core/testing';

import { EspaceImageService } from './espace-image.service';

describe('EspaceImageService', () => {
  let service: EspaceImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspaceImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
