import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Accreditation } from './accreditation';

const routes: Routes = [{ path: '', component: Accreditation }];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AcredditationRoutingModule {}
