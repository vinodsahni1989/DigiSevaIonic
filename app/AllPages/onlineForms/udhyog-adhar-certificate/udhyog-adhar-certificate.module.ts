import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UdhyogAdharCertificatePageRoutingModule } from './udhyog-adhar-certificate-routing.module';

import { UdhyogAdharCertificatePage } from './udhyog-adhar-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UdhyogAdharCertificatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UdhyogAdharCertificatePage]
})
export class UdhyogAdharCertificatePageModule {}
