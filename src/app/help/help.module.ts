import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';

@NgModule({
  imports: [
    SharedModule,
    HelpRoutingModule
  ],
  declarations: [HelpComponent]
})
export class HelpModule { }
