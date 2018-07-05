import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { CredentialPrintingInfoComponent } from './credential-printing-info.component';
import { CredentialPrintingInfoRoutingModule } from './credential-printing-info-routing.module';

@NgModule({
  imports: [SharedModule, CredentialPrintingInfoRoutingModule],
  declarations: [CredentialPrintingInfoComponent]
})
export class CredentialPrintingInfoModule {}
