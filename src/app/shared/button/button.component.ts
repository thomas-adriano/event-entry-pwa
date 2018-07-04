import { Component, OnInit, Input, OnChanges, ElementRef } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() btnType = "success";
  @Input() styleClass: string;
  @Input() disabled;
  @Input() buttonTypeAttr = "button";
  private btnElement: HTMLElement;
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngOnChanges() {
    this.btnElement = this.elementRef.nativeElement.childNodes[0];
    if (!this.btnElement) {
      return;
    }
    if (this.btnType === "success") {
      this.btnElement.classList.add("app-button-success");
    }
    if (this.btnType === "warning") {
      this.btnElement.classList.add("app-button-warn");
    }

    if (this.styleClass) {
      for (let clazz of this.styleClass.split(",")) {
        let trimmed = clazz.trim();
        if (trimmed) {
          this.btnElement.classList.add(trimmed);
        }
      }
    }
  }
}
