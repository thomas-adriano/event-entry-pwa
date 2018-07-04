import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppEventsService } from '../app-events/app-events.service';

@Injectable()
export class AppNavigationService {
  public navigationRegistry = new Array<NavigationRegistry>();
  public static readonly MINIMUM_NAVIGATION_DELAY = 200;
  constructor(public router: Router, private appEventsService: AppEventsService) { }

  public navigateTo(routeName: string, options = {}, delay = 0) {
    this.appEventsService.pageTransitionStart().emit({ delay });
    const timeoutId = setTimeout(() => {
      this.router.navigate([routeName, options]);
      this.appEventsService.pageTransitionEnded().emit();
      this.navigationRegistry = this.navigationRegistry.filter(
        e => e.pageName !== routeName
      );
    }, delay < AppNavigationService.MINIMUM_NAVIGATION_DELAY ? AppNavigationService.MINIMUM_NAVIGATION_DELAY : delay);
    this.navigationRegistry.push(new NavigationRegistry(routeName, timeoutId));
  }

  public cancelNavigation(destinationRouteName: string) {
    if (!destinationRouteName) {
      return;
    }

    const destinationTimeoutId = this.navigationRegistry.find(
      e => e.pageName === destinationRouteName
    ).timeoutId;

    if (destinationTimeoutId === undefined) {
      return;
    }

    clearTimeout(destinationTimeoutId);
    this.appEventsService.pageTransitionCancel().emit();
    this.navigationRegistry = this.navigationRegistry.filter(
      e => e.pageName !== destinationRouteName
    );
  }
}

export class NavigationRegistry {
  constructor(public pageName: string, public timeoutId) { }
}
