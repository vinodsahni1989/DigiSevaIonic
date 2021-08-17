import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasportFormPageRoutingModule } from './pasport-form-routing.module';

import { PasportFormPage } from './pasport-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasportFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PasportFormPage]
})
export class PasportFormPageModule {}
