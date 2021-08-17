import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmKisanSammanFormPageRoutingModule } from './pm-kisan-samman-form-routing.module';

import { PmKisanSammanFormPage } from './pm-kisan-samman-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmKisanSammanFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PmKisanSammanFormPage]
})
export class PmKisanSammanFormPageModule {}
