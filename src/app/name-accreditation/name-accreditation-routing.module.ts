import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NameAccreditationComponent } from './name-accreditation.component';

const routes: Routes = [
  {
    path: '',
    component: NameAccreditationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NameAccreditationRoutingModule {}
