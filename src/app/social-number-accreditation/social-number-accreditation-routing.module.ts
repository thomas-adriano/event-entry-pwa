import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialNumberAccreditationComponent } from './social-number-accreditation.component';

const routes: Routes = [
  { path: '', component: SocialNumberAccreditationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SocialNumberAccreditationRoutingModule {}
