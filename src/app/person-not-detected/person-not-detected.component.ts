import { Component, OnInit } from "@angular/core";
import { AppNavigationService } from "@app/core";

@Component({
  selector: "app-person-not-detected",
  templateUrl: "./person-not-detected.component.html",
  styleUrls: ["./person-not-detected.component.scss"]
})
export class PersonNotDetectedComponent implements OnInit {
  constructor(public navigationService: AppNavigationService) {}

  ngOnInit() {}

  goToAccreditation() {
    this.navigationService.navigateTo("accreditation");
  }

  goToNameAccreditation() {
    this.navigationService.navigateTo("name-accreditation");
  }
}
