import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AppInteractionBoxComponent } from './app-interaction-box/app-interaction-box';
import { SocialNumberKeyboardComponent } from './social-number-keyboard/social-number-keyboard.component';
import { ButtonComponent } from './button/button.component';
import { CameraComponent } from './camera/camera.component';
import { PageTransitionDirective } from './page-transition/page-transition.directive';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  declarations: [
    AppInteractionBoxComponent,
    SocialNumberKeyboardComponent,
    ButtonComponent,
    CameraComponent,
    PageTransitionDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppInteractionBoxComponent,
    SocialNumberKeyboardComponent,
    ButtonComponent,
    CameraComponent,
    PageTransitionDirective,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class SharedModule {}
