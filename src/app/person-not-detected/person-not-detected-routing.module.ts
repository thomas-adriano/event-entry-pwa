import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonNotDetectedComponent } from './person-not-detected.component';

const routes: Routes = [
  {
    path: '',
    component: PersonNotDetectedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonNotDetectedRoutingModule {}
