import { Injectable } from '@angular/core';
import { FaceDetectionResult } from './face-detection-result.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

declare const objectdetect, Smoother;
@Injectable()
export class VideoFaceRecognitionService {
  private static readonly FACE_RECOGNITION_INTERVAL = 3000;
  private detector: any;
  private smoother: any;
  private initialized = false;
  private observable: Observable<FaceDetectionResult>;
  private observer: Observer<FaceDetectionResult>;
  private faceRecognitionTimer;
  private faceRecognitionTimeThresholdHit = false;
  private requestAnimationFrameId;

  constructor() {}

  private initialize() {
    this.smoother = new Smoother(
      [0.9999999, 0.9999999, 0.999, 0.999],
      [0, 0, 0, 0]
    );
    this.observable = new Observable<FaceDetectionResult>(observer => {
      this.observer = observer;
    });
    this.observable.subscribe();
    this.initialized = true;
    this.startFaceDetectionTimer();
  }

  public startFaceDetection(
    videoEl: HTMLVideoElement,
    canvasEl?: HTMLCanvasElement
  ): Observable<FaceDetectionResult> {
    if (!this.initialized) {
      this.initialize();
    }
    this.doDetectFaces(this.observer, videoEl, canvasEl);
    return this.observable;
  }

  private doDetectFaces(
    observer: Observer<FaceDetectionResult>,
    videoEl: HTMLVideoElement,
    canvasEl: HTMLCanvasElement
  ) {
    if (!observer || observer.closed) {
      return;
    }
    this.requestAnimationFrameId = requestAnimationFrame(
      this.startFaceDetection.bind(this, videoEl, canvasEl)
    );
    let coords = [0, 0, 0, 0];

    if (
      videoEl.readyState !== videoEl.HAVE_ENOUGH_DATA ||
      videoEl.videoWidth <= 0
    ) {
      observer.next(new FaceDetectionResult(false, true, coords, null));
      return;
    }

    observer.next(new FaceDetectionResult(false, true, coords, null));

    // Prepare the detector once the video dimensions are known:
    if (!this.detector) {
      let width = ~~((60 * videoEl.videoWidth) / videoEl.videoHeight);
      let height = 60;
      this.detector = new objectdetect.detector(
        width,
        height,
        1.1,
        objectdetect.frontalface
      );
    }

    // Perform the actual detection:
    coords = this.detector.detect(videoEl, 1);
    if (coords[0]) {
      coords = this.smoother.smooth(coords[0]);

      // Rescale coordinates from detector to video coordinate space:
      coords[0] *= videoEl.videoWidth / this.detector.canvas.width;
      coords[1] *= videoEl.videoHeight / this.detector.canvas.height;
      coords[2] *= videoEl.videoWidth / this.detector.canvas.width;
      coords[3] *= videoEl.videoHeight / this.detector.canvas.height;
    } else {
      //se nao encontrou nenhuma face, da restart no timer
      this.startFaceDetectionTimer();
    }

    const imageData = this.getVideoImageAsDataUrl(videoEl);
    if (this.faceRecognitionTimeThresholdHit) {
      observer.next(new FaceDetectionResult(true, true, coords, imageData));
    } else {
      observer.next(new FaceDetectionResult(true, false, coords, imageData));
    }
  }

  private startFaceDetectionTimer() {
    this.faceRecognitionTimeThresholdHit = false;
    if (this.faceRecognitionTimer) {
      clearTimeout(this.faceRecognitionTimer);
    }
    this.faceRecognitionTimer = setTimeout(() => {
      this.faceRecognitionTimeThresholdHit = true;
    }, VideoFaceRecognitionService.FACE_RECOGNITION_INTERVAL);
  }

  public stopFaceDetection() {
    if (this.faceRecognitionTimer) {
      clearTimeout(this.faceRecognitionTimer);
    }
    if (this.observer) {
      this.observer.complete();
      this.observable = null;
    }
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId);
    }
    this.initialized = false;
  }

  public drawRectangle(
    coords: Array<any>,
    videoEl: HTMLVideoElement,
    canvasEl: HTMLCanvasElement,
    aspectRatio: number,
    scale: number
  ) {
    const left = this.getScaledPixels(coords[0], scale);
    const top = this.getScaledPixels(coords[1], scale);
    const width = this.getScaledPixels(coords[2], scale);
    const height = this.getScaledPixels(coords[3], scale);

    var ctx = canvasEl.getContext('2d');
    ctx.strokeStyle = '#7F7E7E';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5 * scale;

    ctx.strokeRect(left, top, width, height);
  }

  private getVideoImageAsDataUrl(video: HTMLVideoElement) {
    const canvas = document.createElement('canvas');
    const scale = 0.45;
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
  }

  private getScaledPixels(pixel: number, scale: number): number {
    return pixel * scale;
  }
}
