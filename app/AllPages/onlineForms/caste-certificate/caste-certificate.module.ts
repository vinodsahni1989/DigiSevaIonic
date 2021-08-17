import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasteCertificatePageRoutingModule } from './caste-certificate-routing.module';

import { CasteCertificatePage } from './caste-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasteCertificatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CasteCertificatePage]
})
export class CasteCertificatePageModule {}
