import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraConfigComponent } from './camera-config.component';

const routes: Routes = [
  {
    path: "",
    component: CameraConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraConfigRoutingModule { }
