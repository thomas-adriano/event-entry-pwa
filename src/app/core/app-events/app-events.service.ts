import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AppEventsService {
  constructor() {}

  private pageTransitionStartedEmitter = new EventEmitter<any>();
  private pageTransitionEndedEmitter = new EventEmitter<any>();
  private pageTransitionCancelledEmitter = new EventEmitter<any>();
  private cameraWidthFoundEmitter = new EventEmitter<any>();
  private cameraHeightFoundEmitter = new EventEmitter<any>();

  public pageTransitionStart() {
    return this.pageTransitionStartedEmitter;
  }

  public pageTransitionEnded() {
    return this.pageTransitionEndedEmitter;
  }

  public pageTransitionCancel() {
    return this.pageTransitionCancelledEmitter;
  }

  public cameraWidthFound() {
    return this.cameraWidthFoundEmitter;
  }

  public cameraHeightFound() {
    return this.cameraHeightFoundEmitter;
  }
}
