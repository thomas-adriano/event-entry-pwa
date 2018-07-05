import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CameraConfigsExtractorService {
  private scanning = true;
  private stream: MediaStream;

  constructor() {}

  public getAvailableCameras(): Observable<MediaDeviceInfo[]> {
    return new Observable(observer => {
      navigator.mediaDevices
        .enumerateDevices()
        .then(deviceInfos => {
          const devices: MediaDeviceInfo[] = [];
          for (let i = 0; i !== deviceInfos.length; ++i) {
            const deviceInfo = deviceInfos[i];
            if (deviceInfo.kind === 'videoinput') {
              devices.push(deviceInfo);
            }
          }
          observer.next(devices);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  public findBestResult(
    target: TargetTestResolution,
    tests: TestResolution[]
  ): TestResolution {
    let res: TestResolution;
    const perfectMatch = (e: TestResolution, t: TargetTestResolution) =>
      e.height <= t.maxHeight &&
      e.height >= t.minHeight &&
      e.width <= t.maxWidth &&
      e.width >= t.minWidth;

    const heightMatch = (e, t) =>
      e.height <= t.maxHeight && e.height >= t.minHeight;

    const widthMatch = (e, t) => e.width <= t.maxWidth && e.width >= t.minWidth;

    // sort in descending order
    tests = tests
      .filter(e => e.status === 'supported')
      .sort((a: TestResolution, b: TestResolution) => {
        const width = b.width - a.width;
        const height = b.height - a.height;
        const aspectRatio = b.width / b.height - a.width / a.height;
        return width + height + aspectRatio;
      });

    res = tests.find(e => perfectMatch(e, target));
    if (!res) {
      res = tests.find(e => widthMatch(e, target));
    }
    if (!res) {
      res = tests.find(e => heightMatch(e, target));
    }
    if (!res) {
      res = tests[0];
    }

    return res;
  }

  public getTestResolutions(
    minHeight: number,
    maxHeight: number
  ): TestResolution[] {
    const ratioHD = 16 / 9;
    const ratioSD = 4 / 3;

    let resolutions = [];

    for (let y = maxHeight; y >= minHeight; y--) {
      let label = (y * ratioHD).toFixed() + 'x' + y;
      let width = parseInt((y * ratioHD).toFixed()); //this was returning a string
      let height = y;
      let ratio = '16:9';
      resolutions.push(new TestResolution(label, width, height, ratio));

      //SD

      label = (y * ratioSD).toFixed() + 'x' + y;
      width = parseInt((y * ratioSD).toFixed());
      ratio = '4:3';
      resolutions.push(new TestResolution(label, width, height, ratio));

      //square
      //noinspection JSSuspiciousNameCombination
      label = y + 'x' + y;
      width = y; //this was returning a string
      height = y;
      ratio = '1:1';
      resolutions.push(new TestResolution(label, width, height, ratio));
    }
    return resolutions;
  }

  public killAllStreams() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
  }

  public startCameraTest(
    candidates: TestResolution[],
    cameras: MediaDeviceInfo[],
    videoEl: HTMLVideoElement
  ): Observable<TestResolution> {
    return new Observable(observer => {
      let completed = 0;
      const total = cameras.length * candidates.length;
      for (const camera of cameras) {
        for (const candidate of candidates) {
          this.testCamera(candidate, camera, videoEl).subscribe(
            val => {
              observer.next(val);
              completed++;
              cameraScanComplete.call(this);
            },
            err => {
              observer.next(
                TestResolution.clone(candidate).setStatus('not_supported')
              );
              completed++;
              cameraScanComplete.call(this);
            }
          );
        }
      }

      function cameraScanComplete() {
        if (completed === total) {
          this.killAllStreams();
          videoEl.srcObject = null;
          observer.complete();
        }
      }
    });
  }

  public testCamera(
    candidate: TestResolution,
    device: MediaDeviceInfo,
    videoEl: HTMLVideoElement
  ): Observable<TestResolution> {
    return new Observable(observer => {
      this.killAllStreams();
      //create constraints object
      var constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          deviceId: device.deviceId ? { exact: device.deviceId } : undefined,
          width: { exact: candidate.width }, //new syntax
          height: { exact: candidate.height } //new syntax
        }
      };

      function gotStream(mediaStream) {
        //change the video dimensions
        videoEl.width = candidate.width;
        videoEl.height = candidate.height;
        this.stream = mediaStream; // make globally available
        videoEl.srcObject = mediaStream;
        observer.next(candidate);
      }

      const gotStreamBinded = gotStream.bind(this);
      setTimeout(() => {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(gotStreamBinded)
          .catch(error => observer.error(error));
      }, this.stream ? 200 : 0); //official examples had this at 200
    });
  }
}

export class TestResolution {
  constructor(
    public label: string,
    public width: number,
    public height: number,
    public aspect: string,
    public status: 'supported' | 'not_supported' = 'supported'
  ) {}

  public static clone(anotherTest: TestResolution): TestResolution {
    return new TestResolution(
      anotherTest.label,
      anotherTest.width,
      anotherTest.height,
      anotherTest.aspect,
      anotherTest.status
    );
  }

  setStatus(newStatus: 'supported' | 'not_supported'): TestResolution {
    return new TestResolution(
      this.label,
      this.width,
      this.height,
      this.aspect,
      newStatus
    );
  }

  getAspectRatio() {
    const [w, h] = this.aspect.split('/');
    return parseInt(w) / parseInt(h);
  }
}

export class TargetTestResolution {
  constructor(
    public minWidth: number,
    public maxWidth: number,
    public minHeight: number,
    public maxHeight: number
  ) {}
}
