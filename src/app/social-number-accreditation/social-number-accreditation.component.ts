import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { StorageService, Person, AppNavigationService } from '@app/core';
import { AppInteractionBoxComponent } from '@app/shared';

@Component({
  selector: 'app-social-number-accreditation',
  templateUrl: './social-number-accreditation.component.html',
  styleUrls: ['./social-number-accreditation.component.scss']
})
export class SocialNumberAccreditationComponent
  implements OnInit, AfterViewInit {
  @ViewChild(AppInteractionBoxComponent) interactionBoxElRef;
  public interactionBoxEl: HTMLElement;
  public stepDescription = 'Informe seu CPF:';
  public interactionBoxStatus = '';
  public enteredSocialNumber = '';

  constructor(
    private appNavigationService: AppNavigationService,
    public database: AngularFireDatabase,
    public storage: StorageService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.interactionBoxElRef) {
      this.interactionBoxEl = this.interactionBoxElRef.elementRef.nativeElement;
    }
  }

  isErrorStatus(): boolean {
    return this.interactionBoxStatus === 'error';
  }

  socialNumberSubmitted($event) {
    this.enteredSocialNumber = $event;
    this.database
      .object(this.enteredSocialNumber)
      .valueChanges()
      .subscribe(
        data => {
          if (data) {
            const person = data as Person;
            this.storage.setActivePerson(person);
            this.success(person.name);
          } else {
            this.unsuccess();
          }
        },
        err => {
          console.log(err);
          this.unsuccess();
        }
      );
  }

  success(personName: string) {
    this.stepDescription = `Encontramos você, ${personName}! :)`;
    this.interactionBoxStatus = 'success';
    this.appNavigationService.navigateTo('credential-withdrawal', {}, 3000);
  }

  unsuccess() {
    this.stepDescription = `CPF ${this.enteredSocialNumber} não localizado.`;
    this.interactionBoxStatus = 'error';
    this.appNavigationService.navigateTo(
      'how-to-proceed',
      {
        showHelpBtn: true,
        showSocialNumberBtn: false,
        tryAgainPage: 'social-number-accreditation',
        errorMsg: `O CPF ${
          this.enteredSocialNumber
        } digitado não foi encontrado.`
      },
      3000
    );
  }
}
