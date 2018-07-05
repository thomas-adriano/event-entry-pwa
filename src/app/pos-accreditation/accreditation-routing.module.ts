import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosAccreditationComponent } from './pos-accreditation.component';

const routes: Routes = [{ path: '', component: PosAccreditationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PosAccreditationRoutingModule {}
