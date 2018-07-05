import { TestBed, inject } from '@angular/core/testing';

import { VideoFaceRecognitionService } from './video-face-recognition.service';

describe('VideoFaceRecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoFaceRecognitionService]
    });
  });

  it('should be created', inject(
    [VideoFaceRecognitionService],
    (service: VideoFaceRecognitionService) => {
      expect(service).toBeTruthy();
    }
  ));
});
