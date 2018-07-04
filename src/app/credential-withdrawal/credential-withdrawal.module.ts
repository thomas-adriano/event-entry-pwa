import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared";
import { CredentialWithdrawalComponent } from "./credential-withdrawal.component";
import { CredentialWithdrawalRoutingModule } from "./credential-withdrawal-routing.module";

@NgModule({
  imports: [SharedModule, CredentialWithdrawalRoutingModule],
  declarations: [CredentialWithdrawalComponent]
})
export class CredentialWithdrawalModule {

}
