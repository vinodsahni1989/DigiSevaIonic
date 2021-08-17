import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OldPentionFormPageRoutingModule } from './old-pention-form-routing.module';

import { OldPentionFormPage } from './old-pention-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OldPentionFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OldPentionFormPage]
})
export class OldPentionFormPageModule {}
