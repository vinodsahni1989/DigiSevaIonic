import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HandicapPentionFormPageRoutingModule } from './handicap-pention-form-routing.module';

import { HandicapPentionFormPage } from './handicap-pention-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HandicapPentionFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HandicapPentionFormPage]
})
export class HandicapPentionFormPageModule {}
