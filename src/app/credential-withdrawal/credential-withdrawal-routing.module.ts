import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialWithdrawalComponent } from './credential-withdrawal.component';

const routes: Routes = [{ path: '', component: CredentialWithdrawalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CredentialWithdrawalRoutingModule {}
