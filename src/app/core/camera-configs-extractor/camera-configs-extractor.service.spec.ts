import { TestBed, inject } from '@angular/core/testing';

import { CameraConfigsExtractorService } from './camera-configs-extractor.service';

describe('CameraConfigsExtractorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CameraConfigsExtractorService]
    });
  });

  it('should be created', inject([CameraConfigsExtractorService], (service: CameraConfigsExtractorService) => {
    expect(service).toBeTruthy();
  }));
});
