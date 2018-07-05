import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  CameraConfigsExtractorService,
  TargetTestResolution,
  TestResolution,
  StorageService
} from '@app/core';

declare const adapter;
@Component({
  selector: 'app-camera-config',
  templateUrl: './camera-config.component.html',
  styleUrls: ['./camera-config.component.scss']
})
export class CameraConfigComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('availableCamerasEl') availableCamerasElRef;
  @ViewChild('videoEl') videoElRef;
  public availableCameras: MediaDeviceInfo[];

  availableCamerasEl: HTMLSelectElement;
  videoEl: HTMLVideoElement;
  public selectedCamera: MediaDeviceInfo;
  scanning = false;
  scanStatus = 'Aguardando inicio';

  constructor(
    public cameraConfigsExtractor: CameraConfigsExtractorService,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.videoElRef) {
      this.videoEl = this.videoElRef.nativeElement;
    }
    if (this.availableCamerasElRef) {
      this.availableCamerasEl = this.availableCamerasElRef.nativeElement;
    }
    // TODO: ver possibilidade de colocar mais dessa logica aqui no servico cameraConfigsExtractor
    this.checkCompatibility();
    this.cameraConfigsExtractor.getAvailableCameras().subscribe(cameras => {
      this.availableCameras = cameras;
      console.log(this.availableCameras);
    });
  }

  ngOnDestroy() {
    this.cameraConfigsExtractor.killAllStreams();
  }

  public startScan() {
    this.scanning = true;
    this.scanStatus = 'Iniciando...';
    const minHeight = 400;
    const maxHeight = 500;
    const maxWidth = 800;
    const minWidth = 700;
    const target = new TargetTestResolution(
      minWidth,
      maxWidth,
      minHeight,
      maxHeight
    );
    const supportedRes: TestResolution[] = [];
    const candidates = this.cameraConfigsExtractor.getTestResolutions(
      minHeight,
      maxHeight
    );
    this.cameraConfigsExtractor
      .startCameraTest(candidates, [this.selectedCamera], this.videoEl)
      .subscribe(
        val => {
          supportedRes.push(val);
          this.scanStatus = 'Escaneando';
        },
        err => {
          console.log(err);
        },
        () => {
          const best = this.cameraConfigsExtractor.findBestResult(
            target,
            supportedRes
          );
          console.log(best);
          this.storageService.setCameraWidth(best.width);
          this.storageService.setCameraHeight(best.height);
          this.scanStatus = 'Escaneamento realizado com sucesso!';
          this.scanning = false;
        }
      );
  }

  checkCompatibility() {
    if (!navigator.getUserMedia) {
      throw Error('You need a browser that supports WebRTC');
    }
  }
}
