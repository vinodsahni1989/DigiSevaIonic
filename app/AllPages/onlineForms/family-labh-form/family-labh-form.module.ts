import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyLabhFormPageRoutingModule } from './family-labh-form-routing.module';

import { FamilyLabhFormPage } from './family-labh-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilyLabhFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FamilyLabhFormPage]
})
export class FamilyLabhFormPageModule {}
