import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  ElementRef,
  OnChanges,
  ViewChild,
  EventEmitter,
  AfterViewInit
} from '@angular/core';

declare const navigator;
declare const document: Document;
@Component({
  selector: 'app-interaction-box',
  templateUrl: './app-interaction-box.html',
  styleUrls: ['./app-interaction-box.scss']
})
export class AppInteractionBoxComponent
  implements OnDestroy, OnChanges, OnInit, AfterViewInit {
  @Input() status: string; //loading, error, success, normal
  @Input() photo: string;
  @Input() csstext = '';
  @Input() elWidth;
  @Input() elHeight;
  @ViewChild('interactionBox') private interactionBoxElementRef: ElementRef;
  @ViewChild('interactionBoxOverlay')
  private interactionBoxStatusOverlayElementRef: ElementRef;
  private interactionBoxElement: HTMLElement;
  private interactionBoxStatusOverlayElement: Element;
  private storageWidthKey = 'interaction_box_width';
  private storageHeightKey = 'interaction_box_height';

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.status = 'normal';
  }

  ngOnChanges() {
    this.loadNativeElements();
    this.changeInteractionBoxStatus();
    if (this.photo && this.interactionBoxElement) {
      this.createPhotoElement(this.interactionBoxElement);
    }

    if (this.csstext && this.interactionBoxElement) {
      this.interactionBoxElement.style.cssText = this.csstext;
    }

    if (this.elWidth && this.elHeight && this.interactionBoxElement) {
      this.interactionBoxElement.style.width = this.elWidth + 'px';
      this.interactionBoxElement.style.height = this.elHeight + 'px';
    }
  }

  ngAfterViewInit() {
    this.loadNativeElements();
  }

  private loadNativeElements() {
    if (this.interactionBoxElementRef) {
      this.interactionBoxElement = this.interactionBoxElementRef.nativeElement;
    }
    if (this.interactionBoxStatusOverlayElementRef) {
      this.interactionBoxStatusOverlayElement = this.interactionBoxStatusOverlayElementRef.nativeElement;
    }
  }

  ngOnDestroy() {}

  private changeInteractionBoxStatus() {
    if (!this.interactionBoxStatusOverlayElement) {
      return;
    }
    if (this.status === 'normal') {
      this.interactionBoxStatusOverlayElement.classList.remove(
        'app-interaction-box-status-overlay--loading',
        'app-interaction-box-status-overlay--error',
        'app-interaction-box-status-overlay--success'
      );
      this.interactionBoxStatusOverlayElement.classList.add(
        'app-interaction-box-status-overlay--normal'
      );
    }
    if (this.status === 'loading') {
      if (this.interactionBoxStatusOverlayElement) {
        this.interactionBoxStatusOverlayElement.classList.remove(
          'app-interaction-box-status-overlay--normal',
          'app-interaction-box-status-overlay--error',
          'app-interaction-box-status-overlay--success'
        );
        this.interactionBoxStatusOverlayElement.classList.add(
          'app-interaction-box-status-overlay--loading'
        );
      }
    }
    if (this.status === 'error') {
      this.interactionBoxStatusOverlayElement.classList.remove(
        'app-interaction-box-status-overlay--normal',
        'app-interaction-box-status-overlay--loading',
        'app-interaction-box-status-overlay--success'
      );
      this.interactionBoxStatusOverlayElement.classList.add(
        'app-interaction-box-status-overlay--error'
      );
    }
    if (this.status === 'success') {
      this.interactionBoxStatusOverlayElement.classList.remove(
        'app-interaction-box-status-overlay--normal',
        'app-interaction-box-status-overlay--error',
        'app-interaction-box-status-overlay--loading'
      );
      this.interactionBoxStatusOverlayElement.classList.add(
        'app-interaction-box-status-overlay--success'
      );
    }
  }

  private createPhotoElement(parent: HTMLElement) {
    if (!parent) {
      return;
    }
    const photoEl = document.createElement('span');
    photoEl.style.cssText = `
      background-image: url(${this.photo});
      background-size: cover;
      background-repeat: no-repeat;
      background-color: #FBFBFB;
      padding: 80px;
      border-radius: 50%;
      position: absolute;
      top: 0;
      margin-top: -80px;
      transform: scale(-1, 1);
      filter: FlipH;
    `;
    if (!parent.style.marginTop) {
      parent.style.marginTop = '80px';
    }
    if (!parent.style.paddingTop) {
      parent.style.paddingTop = '110px';
    }
    parent.appendChild(photoEl);
  }

  public takePicture() {}
}
