import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AppNavigationService, StorageService } from '@app/core';

@Component({
  selector: 'page-welcome',
  templateUrl: './page-welcome.html',
  styleUrls: ['./page-welcome.scss']
})
export class PageWelcome implements AfterViewInit, OnInit {
  options = ['aaa', 'bbb'];
  constructor(
    private appNavigationService: AppNavigationService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.storageService.removeActivePerson();
    this.storageService.removeActivePersonPhoto();
    // define width e height iniciais padroes.
    // estes valores serão sobrescritos ao acionar a camera e
    // obter as dimenções reais
    const defaultWidth = window.screen.width / 2;
    const defaultHeight = window.screen.height / 2;
    this.storageService.setCameraWidth(
      this.storageService.getCameraWidth() || defaultWidth
    );
    this.storageService.setCameraHeight(
      this.storageService.getCameraHeight() || defaultHeight
    );
  }

  ngAfterViewInit() {}

  public start() {
    this.appNavigationService.navigateTo('/accreditation', {}, 750);
  }

  public openCameraConfig(evt) {
    this.appNavigationService.navigateTo('/camera-config');
  }

  public requestFullscreen() {
    this.doRequestFullscreen(document.documentElement);
  }

  private doRequestFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
}
