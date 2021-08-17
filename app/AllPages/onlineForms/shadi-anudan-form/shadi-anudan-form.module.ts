import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShadiAnudanFormPageRoutingModule } from './shadi-anudan-form-routing.module';

import { ShadiAnudanFormPage } from './shadi-anudan-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShadiAnudanFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ShadiAnudanFormPage]
})
export class ShadiAnudanFormPageModule {}
