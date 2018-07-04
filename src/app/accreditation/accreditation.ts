import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { setTimeout } from 'timers';
import { AngularFireDatabase } from 'angularfire2/database';
import {
  RekognitionService,
  FaceDetectionResult,
  AppNavigationService,
  AppEventsService,
  StorageService,
  Person,
  splitCamelCase
} from '@app/core';
import { AppCameraModes } from '@app/shared';

declare const mixpanel;
@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.html',
  styleUrls: ['./accreditation.scss']
})
export class Accreditation implements AfterViewInit, OnInit {
  public stepDescription: string;
  public interactionBoxStatus: string;
  public appCameraMode = AppCameraModes.SHAPE_OVERLAY;
  public readonly interactionBoxCssText = this.getInteractionBoxCssText();
  public cameraElHeight;
  public cameraElWidth;

  constructor(
    private router: Router,
    private rekognitionService: RekognitionService,
    private navigationService: AppNavigationService,
    private storageService: StorageService,
    public database: AngularFireDatabase,
    public storage: StorageService,
    public appEventsService: AppEventsService
  ) {}

  getInteractionBoxCssText(): string {
    return `
      padding: 0;
      overflow: hidden;
    `;
  }

  ngOnInit() {
    this.stepDescription = 'Posicione seu rosto no meio do quadro.';
    this.interactionBoxStatus = 'normal';
    this.cameraElHeight = this.storageService.getCameraHeight();
    this.cameraElWidth = this.storageService.getCameraWidth();
  }

  ngAfterViewInit() {}

  socialNumberSubmited(number) {}

  onCameraError($event) {
    this.navigationService.navigateTo('help', {
      errorMsg: `Ocorreu um erro acionando a camera deste dispositivo. ${$event}`
    });
  }

  onFaceDetection(result: FaceDetectionResult) {
    this.interactionBoxStatus = 'loading';
    this.stepDescription = 'Aguarde, estamos analisando a imagem...';
    mixpanel.track('face-detection-start');
    this.rekognitionService.recongnize(result.imageData).subscribe(
      data => {
        const matchedFace =
          data.FaceMatches && data.FaceMatches.length
            ? data.FaceMatches[0]
            : {};
        const personName = matchedFace
          ? matchedFace.Face
            ? matchedFace.Face.ExternalImageId
            : ''
          : '';
        if (matchedFace && matchedFace.Similarity >= 80) {
          this.faceDetected(result.imageData, personName);
          mixpanel.track('face-detection-success', {name: personName});
        } else {
          this.faceNotDetected();
          mixpanel.track('face-detection-fail');
        }
      },
      err => {
        this.faceNotDetected();
        console.log(err);
      },
      () => console.log('face rec finished')
    );
  }

  isErrorStatus(): boolean {
    return this.interactionBoxStatus === 'error';
  }

  public navigateToNext(routeName, param = {}) {
    this.navigationService.navigateTo(routeName, param, 3000);
  }

  onFaceNotDetected() {
    this.navigationService.navigateTo('person-not-detected');
  }

  faceDetected(personPhoto, personName: string) {
    this.interactionBoxStatus = 'success';
    this.stepDescription = 'Encontramos você! :)';
    this.storage.setActivePerson(
      new Person('', splitCamelCase(personName), '')
    );
    this.storage.setActivePersonPhoto(personPhoto);
    this.navigateToNext('/pos-accreditation');
    // this.database
    //   .object(personName)
    //   .valueChanges()
    //   .subscribe(
    //     data => {
    //       if (data) {
    //         const person = data as Person;
    //         this.storage.setActivePerson(person);
    //         this.storage.setActivePersonPhoto(personPhoto);
    //         this.navigateToNext("/pos-accreditation");
    //       } else {
    //         this.faceDetectedButPersonNotFound(personPhoto);
    //       }
    //     },
    //     err => {
    //       this.faceDetectedButPersonNotFound(personPhoto);
    //     }
    //   );
  }

  faceDetectedButPersonNotFound(personPhoto) {
    this.storage.setActivePerson(Person.PERSON_NOT_FOUND);
    this.navigateToNext('/pos-accreditation');
  }

  faceNotDetected() {
    this.interactionBoxStatus = 'error';
    this.stepDescription = 'Não conseguimos reconhecer você :(';
    this.navigateToNext('/how-to-proceed', {
      showHelpBtn: false,
      showSocialNumberBtn: true,
      tryAgainPage: 'accreditation'
    });
  }
}
