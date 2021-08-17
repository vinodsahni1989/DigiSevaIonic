import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoterIdFormPageRoutingModule } from './voter-id-form-routing.module';

import { VoterIdFormPage } from './voter-id-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoterIdFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VoterIdFormPage]
})
export class VoterIdFormPageModule {}
