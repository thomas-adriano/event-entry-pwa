import {
  Component,
  AfterViewInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  VideoFaceRecognitionService,
  FaceDetectionResult,
  StorageService
} from '@app/core';
declare const Smoother, objectdetect;
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  providers: [VideoFaceRecognitionService]
})
export class CameraComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cameraVideo') public cameraVideoElRef: ElementRef;
  @ViewChild('cameraVideoCanvas') public cameraVideoCanvasElRef: ElementRef;
  @ViewChild('faceDetectedOverlayImg')
  public faceDetectedOverlayImgElRef: ElementRef;
  @Input() public mode: AppCameraModes = AppCameraModes.SHAPE_OVERLAY;
  @Input() public width;
  @Input() public height;
  @Input() public faceNotDetectedTimeout = 10000;
  @Output() public faceNotFound = new EventEmitter<any>();
  @Output() public faceDetected = new EventEmitter<FaceDetectionResult>();
  @Output() public cameraError = new EventEmitter<any>();
  private faceNotDetectedTimeoutId;
  public blankImageDataUrl =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  private videoEl: HTMLVideoElement;
  private originalVideoElDisplay: string;
  constructor(
    public videoFaceRecognitionService: VideoFaceRecognitionService,
    private storageService: StorageService
  ) {}

  ngAfterViewInit() {
    const scale = window.devicePixelRatio;
    const cameraWidth = this.width;
    // ajusta a proporcao da camera. Cheguei nele por tentativa e erro, nao sei a explicacao :D;
    const cameraHeight = (this.height *= 1.012);

    this.initVideoEl(cameraWidth, cameraHeight);
    const canvasEl = this.initCanvasEl(cameraWidth, cameraHeight, scale);
    const detectedFaceImageEl = this.initDetectedFaceImgEl(
      cameraWidth,
      cameraHeight
    );

    this.initCamera(
      cameraWidth,
      cameraHeight,
      scale,
      canvasEl,
      detectedFaceImageEl
    );
  }

  ngOnDestroy() {
    clearTimeout(this.faceNotDetectedTimeoutId);
    this.finalizeCamera();
  }

  private initCamera(
    cameraWidth: number,
    cameraHeight: number,
    scale: number,
    canvasEl: HTMLCanvasElement,
    detectedFaceImageEl: HTMLImageElement
  ) {
    const width =
      !cameraWidth || Number.isNaN(cameraWidth) ? undefined : cameraWidth;
    const height =
      !cameraHeight || Number.isNaN(cameraHeight) ? undefined : cameraHeight;
    const aspectRatio = cameraWidth ? cameraWidth / cameraHeight : undefined;

    const videoConstraints: MediaTrackConstraints = {
      width,
      height,
      aspectRatio,
      facingMode: {
        ideal: 'user'
      }
    };
    const constraints: MediaStreamConstraints = {
      audio: false,
      video: videoConstraints
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        this.videoEl.srcObject = mediaStream;
        this.videoEl.onloadedmetadata = e => {
          this.startFaceNotDetectedTimeout();
          this.videoEl.play();
          this.videoFaceRecognitionService
            .startFaceDetection(this.videoEl, canvasEl)
            .subscribe((result: FaceDetectionResult) => {
              this.videoEl.style.display =
                this.originalVideoElDisplay || this.videoEl.style.display;
              if (!result.faceFound) {
                this.clearCanvas(canvasEl);
              } else {
                if (canvasEl && result.faceFound) {
                  this.videoFaceRecognitionService.drawRectangle(
                    result.coords,
                    this.videoEl,
                    canvasEl,
                    cameraWidth / cameraHeight,
                    scale
                  );
                } else {
                  this.clearCanvas(canvasEl);
                }
                if (result.trustedResult && result.faceFound) {
                  detectedFaceImageEl.src = result.imageData;
                  this.finalizeCamera();
                  if (this.faceNotDetectedTimeoutId) {
                    clearTimeout(this.faceNotDetectedTimeoutId);
                  }
                  this.faceDetected.emit(result);
                  this.clearCanvas(canvasEl);
                }
              }
            });
        };
      })
      .catch(err => {
        this.cameraError.emit(err);
      });
  }

  private startFaceNotDetectedTimeout() {
    if (this.faceNotDetectedTimeoutId) {
      clearTimeout(this.faceNotDetectedTimeoutId);
    }
    this.faceNotDetectedTimeoutId = setTimeout(
      () => this.faceNotFound.emit(),
      this.faceNotDetectedTimeout
    );
  }

  private initVideoEl(cameraWidth: number, cameraHeight: number) {
    this.videoEl = this.cameraVideoElRef.nativeElement as HTMLVideoElement;
    this.videoEl.style.width = cameraWidth + 'px';
    this.videoEl.style.height = cameraHeight + 'px';
  }

  private initCanvasEl(
    cameraWidth: number,
    cameraHeight: number,
    scale: number
  ): HTMLCanvasElement {
    const canvasEl = this.cameraVideoCanvasElRef
      .nativeElement as HTMLCanvasElement;
    canvasEl.width = cameraWidth * scale;
    canvasEl.height = cameraHeight * scale;
    canvasEl.style.width = cameraWidth + 'px';
    canvasEl.style.height = cameraHeight + 'px';
    return canvasEl;
  }

  private initDetectedFaceImgEl(
    cameraWidth: number,
    cameraHeight: number
  ): HTMLImageElement {
    const detectedFaceImageEl = this.faceDetectedOverlayImgElRef
      .nativeElement as HTMLImageElement;
    detectedFaceImageEl.style.height = cameraHeight + 'px';
    detectedFaceImageEl.style.width = cameraWidth + 'px';
    return detectedFaceImageEl;
  }

  private clearCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    // Store the current transformation matrix
    context.save();

    // Use the identity matrix while clearing the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    context.restore();
  }

  private finalizeCamera() {
    if (!this.originalVideoElDisplay) {
      this.originalVideoElDisplay = this.videoEl.style.display;
    }
    this.videoFaceRecognitionService.stopFaceDetection();
    if (this.videoEl) {
      this.videoEl.pause();
      this.videoEl.style.display = 'none';
      this.videoEl.src = null;
      this.videoEl.srcObject = null;
      this.videoEl.onloadedmetadata = null;
    }
  }
}

export enum AppCameraModes {
  CAMERA_ONLY,
  FACIAL_RECOGNITION,
  SHAPE_OVERLAY
}
