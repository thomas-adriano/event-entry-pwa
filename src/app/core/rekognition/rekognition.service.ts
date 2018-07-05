import { Injectable } from '@angular/core';
import { Rekognition, config, CognitoIdentityCredentials } from 'aws-sdk';
import { AWSError } from 'aws-sdk/lib/error';
import { Observable } from 'rxjs/Observable';
import { SearchFacesByImageResponse } from 'aws-sdk/clients/rekognition';

@Injectable()
export class RekognitionService {
  private rekognition: Rekognition;

  public recongnize(
    photoBase64: string,
    faceMatchThreshold = 80
  ): Observable<SearchFacesByImageResponse> {
    config.region = 'us-east-1';
    config.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:5c28fb73-9673-4432-8aa8-910454e23270'
    });

    const rekognition = this.getRekognitionInstance();
    return new Observable(observer => {
      var params: Rekognition.SearchFacesByImageRequest = {
        CollectionId: 'kickoff2018-dev',
        Image: {
          Bytes: this.getBinary(photoBase64)
        },
        FaceMatchThreshold: faceMatchThreshold,
        MaxFaces: 1
      };

      rekognition.searchFacesByImage(params, (err, data) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
          observer.complete();
        }
      });
    });
  }

  private getRekognitionInstance() {
    if (!this.rekognition) {
      this.rekognition = new Rekognition();
    }
    return this.rekognition;
  }

  private getBinary(encodedFile) {
    var base64Image = encodedFile.split('data:image/png;base64,')[1];
    var binaryImg = atob(base64Image);
    var length = binaryImg.length;
    var ab = new ArrayBuffer(length);
    var ua = new Uint8Array(ab);
    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }

    var blob = new Blob([ab], {
      type: 'image/jpeg'
    });

    return ab;
  }
}
