import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { PosAccreditationComponent } from './pos-accreditation.component';
import { PosAccreditationRoutingModule } from './accreditation-routing.module';

@NgModule({
  imports: [SharedModule, PosAccreditationRoutingModule],
  declarations: [PosAccreditationComponent]
})
export class PosAccreditationModule {
  personName = 'Test Person';
}
