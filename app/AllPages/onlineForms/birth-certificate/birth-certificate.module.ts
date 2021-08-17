import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthCertificatePageRoutingModule } from './birth-certificate-routing.module';

import { BirthCertificatePage } from './birth-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirthCertificatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BirthCertificatePage]
})
export class BirthCertificatePageModule {}
