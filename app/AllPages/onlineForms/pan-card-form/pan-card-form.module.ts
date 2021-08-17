import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanCardFormPageRoutingModule } from './pan-card-form-routing.module';

import { PanCardFormPage } from './pan-card-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanCardFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PanCardFormPage]
})
export class PanCardFormPageModule { }
