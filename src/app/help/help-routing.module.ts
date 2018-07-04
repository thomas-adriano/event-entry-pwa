import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from "./help.component";

const routes: Routes = [
  { path: '', component: HelpComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HelpRoutingModule { }
