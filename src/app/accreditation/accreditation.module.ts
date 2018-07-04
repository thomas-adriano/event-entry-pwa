import { NgModule } from '@angular/core';
import { Accreditation } from './accreditation';
import { AcredditationRoutingModule } from "./accreditation-routing.module";
import { SharedModule } from "@app/shared";

@NgModule({
  declarations: [
    Accreditation
  ],
  imports: [
    AcredditationRoutingModule,
    SharedModule
  ],
})
export class AccreditationModule { }
