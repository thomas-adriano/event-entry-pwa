import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { AppNavigationService } from "@app/core";
import { setTimeout } from "timers";

declare const mixpanel;
@Component({
  selector: "app-credential-withdrawal",
  templateUrl: "./credential-withdrawal.component.html",
  styleUrls: ["./credential-withdrawal.component.scss"]
})
export class CredentialWithdrawalComponent implements AfterViewInit, OnDestroy {
  public personName: string;
  public counterInterval;
  public counter = 5;

  constructor(private appNavigation: AppNavigationService) {}

  ngAfterViewInit() {
    this.appNavigation.navigateTo("welcome", {}, 5000);
    this.counterInterval = setInterval(() => {
      if (this.counter === 0) {
        clearInterval(this.counterInterval);
      } else {
        this.counter--;
      }
    }, 1000);
    mixpanel.track("session-end");
  }

  ngOnDestroy() {
    clearInterval(this.counterInterval);
  }

  goToWelcome() {
    this.appNavigation.cancelNavigation("welcome");
    this.appNavigation.navigateTo("welcome");
  }
}
