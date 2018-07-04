export { CoreModule } from './core.module';

export { RekognitionService } from './rekognition/rekognition.service';
export {
  VideoFaceRecognitionService
} from './video-face-recognition/video-face-recognition.service';
export {
  FaceDetectionResult
} from './video-face-recognition/face-detection-result.model';
export { ZebraPrinterService } from './zebra-printer/zebra-printer.service';
export { StorageService } from './storage/storage.service';
export { AppEventsService } from './app-events/app-events.service';
export { AppNavigationService } from './app-navigation/app-navigation.service';
export {
  CameraConfigsExtractorService,
  TestResolution,
  TargetTestResolution
} from './camera-configs-extractor/camera-configs-extractor.service';
export { splitCamelCase } from './utils';

// models
export { Person } from './models/person';
