import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NameAccreditationRoutingModule } from './name-accreditation-routing.module';
import { NameAccreditationComponent } from './name-accreditation.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, NameAccreditationRoutingModule],
  declarations: [NameAccreditationComponent]
})
export class NameAccreditationModule {}
