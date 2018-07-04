import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppNavigationService } from "@app/core";

@Component({
  selector: "app-how-to-proceed",
  templateUrl: "./how-to-proceed.component.html",
  styleUrls: ["./how-to-proceed.component.scss"]
})
export class HowToProceedComponent implements OnInit {
  public showHelpBtn = false;
  public showSocialNumberBtn = false;
  private tryAgainPage = "";
  private errorMsg = "";

  constructor(
    private appNavigationService: AppNavigationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.showHelpBtn = params.showHelpBtn === "true";
      this.showSocialNumberBtn = params.showSocialNumberBtn === "true";
      this.tryAgainPage = params.tryAgainPage;
      this.errorMsg = params.errorMsg;
    });
  }

  goToTryAgainPage() {
    this.appNavigationService.navigateTo(this.tryAgainPage);
  }

  goToSocialNumberAccreditation() {
    this.appNavigationService.navigateTo("social-number-accreditation");
  }

  goToNameAccreditation() {
    this.appNavigationService.navigateTo("name-accreditation");
  }

  goToHelp() {
    this.appNavigationService.navigateTo("help", { errorMsg: this.errorMsg });
  }
}
