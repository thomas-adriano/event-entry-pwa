import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HowToProceedComponent } from './how-to-proceed.component';

const routes: Routes = [{ path: '', component: HowToProceedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HowToProceedRoutingModule {}
