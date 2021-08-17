import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrivingLicenceFormPageRoutingModule } from './driving-licence-form-routing.module';

import { DrivingLicenceFormPage } from './driving-licence-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrivingLicenceFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DrivingLicenceFormPage]
})
export class DrivingLicenceFormPageModule {}
