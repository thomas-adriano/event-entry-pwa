import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppNavigationService, StorageService, Person } from "@app/core";
import * as alertify from "alertify.js";

declare const mixpanel;
@Component({
  selector: "app-pos-accreditation",
  templateUrl: "./pos-accreditation.component.html",
  styleUrls: ["./pos-accreditation.component.scss"]
})
export class PosAccreditationComponent implements OnInit {
  private static readonly DEFAULT_PHOTO = "assets/img/stub-person-photo.png";
  activePerson: Person;
  personPhoto;

  constructor(
    private appNavigationService: AppNavigationService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.personPhoto = this.storageService.getActivePersonPhoto();
    this.activePerson =
      this.storageService.getActivePerson() || Person.PERSON_NOT_FOUND;

    if (Person.isNotFound(this.activePerson)) {
      alertify.logPosition("top right");
      alertify.error(
        '<span class="printer-config__msg-toast">Não foi possível encontrar você. :(</span>'
      );
      this.appNavigationService.navigateTo(
        "help",
        {
          errorMsg: `Face reconhecida, mas CPF ${
            this.activePerson.socialNumber
          } não encontrado.`
        },
        3000
      );
    }
  }

  goToCredentialWithdrawal() {
    this.appNavigationService.navigateTo("credential-withdrawal");
  }

  goToAccreditation() {
    mixpanel.track("face-detection-mixed-up");
    this.appNavigationService.navigateTo("accreditation");
  }
}
