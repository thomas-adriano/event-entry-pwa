import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-start-button",
  templateUrl: "./app-start-button.html",
  styleUrls: ["./app-start-button.scss"]
})
export class AppStartButtonComponent implements AfterViewInit {
  @ViewChild("startButton") buttonElRef: ElementRef;
  @ViewChild("startButtonInnerCircle") buttonInnerCircleElRef: ElementRef;
  text: string;

  constructor() {

  }

  ngAfterViewInit() {

  }

  public onButtonDown(evt) {
    this.buttonElRef.nativeElement.classList.add("app-start-button--active");
    this.buttonInnerCircleElRef.nativeElement.classList.add("app-start-button__circle--active");
    setTimeout(() => {
      this.buttonInnerCircleElRef.nativeElement.classList.add("app-start-button--button-expansion");
      // this.buttonElRef.nativeElement.classList.add("app-start-button--button-color-shift");
    }, 300);

    setTimeout(() => {
      this.buttonElRef.nativeElement.style.zIndex = 0;
    }, 600);
  }


}
