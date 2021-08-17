import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RationCardFormPageRoutingModule } from './ration-card-form-routing.module';

import { RationCardFormPage } from './ration-card-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RationCardFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RationCardFormPage]
})
export class RationCardFormPageModule {}
