import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
import { AppEventsService, AppNavigationService } from '@app/core';

@Directive({
  selector: '[appPageTransition]'
})
export class PageTransitionDirective implements AfterViewInit {
  @Input('appPageTransition') transitionTypes: any;

  constructor(public el: ElementRef, appEventsService: AppEventsService) {
    appEventsService.pageTransitionStart().subscribe(data => {
      if (!el || !el.nativeElement) {
        return;
      }
      const htmlEl: HTMLElement = el.nativeElement;
      const navigationDelay = data && data.delay ? parseInt(data.delay) : 0;
      let additionalDelay =
        navigationDelay - AppNavigationService.MINIMUM_NAVIGATION_DELAY;
      if (additionalDelay < 0) {
        additionalDelay = 0;
      }
      setTimeout(() => {
        htmlEl.classList.add('page-transition-leave-right');
      }, additionalDelay);
    });
  }

  ngAfterViewInit() {
    const htmlEl: HTMLElement = this.el.nativeElement;
    if (this.transitionTypes && this.transitionTypes.enter === 'center') {
      htmlEl.classList.add('page-transition-enter-center');
    } else {
      htmlEl.classList.add('page-transition-enter-left');
    }
  }
}
