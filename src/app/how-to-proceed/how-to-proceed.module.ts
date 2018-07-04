import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared";

import { HowToProceedRoutingModule } from "./how-to-proceed-routing.module";
import { HowToProceedComponent } from "./how-to-proceed.component";

@NgModule({
  imports: [SharedModule, HowToProceedRoutingModule],
  declarations: [HowToProceedComponent]
})
export class HowToProceedModule {}
