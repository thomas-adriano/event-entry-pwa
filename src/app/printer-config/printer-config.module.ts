import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PrinterConfigRoutingModule } from './printer-config-routing.module';
import { PrinterConfigComponent } from './printer-config.component';

@NgModule({
  imports: [SharedModule, PrinterConfigRoutingModule],
  declarations: [PrinterConfigComponent]
})
export class PrinterConfigModule {}
