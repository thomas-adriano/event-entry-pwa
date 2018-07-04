import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { PageNotFoundComponent } from "./not-found.component";

const appRoutes: Routes = [
  {
    path: "welcome",
    loadChildren: "app/page-welcome/page-welcome.module#PageWelcomeModule"
  },
  {
    path: "accreditation",
    loadChildren: "app/accreditation/accreditation.module#AccreditationModule"
  },
  {
    path: "social-number-accreditation",
    loadChildren:
      "app/social-number-accreditation/social-number-accreditation.module#SocialNumberAccreditationModule"
  },
  {
    path: "name-accreditation",
    loadChildren:
      "app/name-accreditation/name-accreditation.module#NameAccreditationModule"
  },
  {
    path: "person-not-detected",
    loadChildren:
      "app/person-not-detected/person-not-detected.module#PersonNotDetectedModule"
  },
  {
    path: "pos-accreditation",
    loadChildren:
      "app/pos-accreditation/pos-accreditation.module#PosAccreditationModule"
  },
  {
    path: "how-to-proceed",
    loadChildren: "app/how-to-proceed/how-to-proceed.module#HowToProceedModule"
  },
  {
    path: "help",
    loadChildren: "app/help/help.module#HelpModule"
  },
  {
    path: "credential-withdrawal",
    loadChildren:
      "app/credential-withdrawal/credential-withdrawal.module#CredentialWithdrawalModule"
  },
  {
    path: "camera-config",
    loadChildren: "app/camera-config/camera-config.module#CameraConfigModule"
  },
  {
    path: "credential-printing-info",
    loadChildren:
      "app/credential-printing-info/credential-printing-info.module#CredentialPrintingInfoModule"
  },
  {
    path: "printer-config",
    loadChildren: "app/printer-config/printer-config.module#PrinterConfigModule"
  },
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      // enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
