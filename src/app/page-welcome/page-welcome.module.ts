import { NgModule } from '@angular/core';
import { PageWelcome } from './page-welcome';
import { SharedModule } from '@app/shared';
import { AppStartButtonComponent } from './app-start-button/app-start-button';
import { PageWelcomeRoutingModule } from './page-welcome-routing.module';

@NgModule({
  declarations: [PageWelcome, AppStartButtonComponent],
  imports: [SharedModule, PageWelcomeRoutingModule],
  exports: [PageWelcome]
})
export class PageWelcomeModule {}
