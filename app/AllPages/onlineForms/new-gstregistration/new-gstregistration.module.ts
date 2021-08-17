import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGSTRegistrationPageRoutingModule } from './new-gstregistration-routing.module';

import { NewGSTRegistrationPage } from './new-gstregistration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewGSTRegistrationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewGSTRegistrationPage]
})
export class NewGSTRegistrationPageModule {}
