import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageWelcome } from './page-welcome';

const welcomeRoutes: Routes = [{ path: '', component: PageWelcome }];

@NgModule({
  imports: [RouterModule.forChild(welcomeRoutes)]
})
export class PageWelcomeRoutingModule {}
