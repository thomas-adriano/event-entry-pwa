export class FaceDetectionResult {
  constructor(
    public faceFound: boolean,
    public trustedResult: boolean,
    public coords: Array<any>,
    public imageData: string
  ) {}
}
