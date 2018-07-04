import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared";
import { SocialNumberAccreditationComponent } from "./social-number-accreditation.component";
import { SocialNumberAccreditationRoutingModule } from "./social-number-accreditation-routing.module";

@NgModule({
  imports: [SharedModule, SocialNumberAccreditationRoutingModule],
  declarations: [SocialNumberAccreditationComponent]
})
export class SocialNumberAccreditationModule {}
