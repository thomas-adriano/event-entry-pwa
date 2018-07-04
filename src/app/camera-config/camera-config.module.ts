import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { CameraConfigRoutingModule } from './camera-config-routing.module';
import { CameraConfigComponent } from './camera-config.component';

@NgModule({
  imports: [
    SharedModule,
    CameraConfigRoutingModule
  ],
  declarations: [CameraConfigComponent]
})
export class CameraConfigModule { }
