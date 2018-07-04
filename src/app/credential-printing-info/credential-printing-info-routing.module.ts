import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CredentialPrintingInfoComponent } from "./credential-printing-info.component";

const routes: Routes = [
  { path: "", component: CredentialPrintingInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CredentialPrintingInfoRoutingModule {}
