import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WidowPentionFormPageRoutingModule } from './widow-pention-form-routing.module';

import { WidowPentionFormPage } from './widow-pention-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WidowPentionFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [WidowPentionFormPage]
})
export class WidowPentionFormPageModule {}
