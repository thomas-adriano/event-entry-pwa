import { NgModule } from '@angular/core';
import { RekognitionService } from './rekognition/rekognition.service';
import { ZebraPrinterService } from './zebra-printer/zebra-printer.service';
import { StorageService } from './storage/storage.service';
import { AppNavigationService } from './app-navigation/app-navigation.service';
import { AppEventsService } from './app-events/app-events.service';
import { CameraConfigsExtractorService } from './camera-configs-extractor/camera-configs-extractor.service';

@NgModule({
  providers: [
    RekognitionService,
    ZebraPrinterService,
    StorageService,
    AppNavigationService,
    AppEventsService,
    CameraConfigsExtractorService
  ]
})
export class CoreModule {}
