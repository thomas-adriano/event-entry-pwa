import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonNotDetectedRoutingModule } from './person-not-detected-routing.module';
import { PersonNotDetectedComponent } from './person-not-detected.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, PersonNotDetectedRoutingModule],
  declarations: [PersonNotDetectedComponent]
})
export class PersonNotDetectedModule {}
