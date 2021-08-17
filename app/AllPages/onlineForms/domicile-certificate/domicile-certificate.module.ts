import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomicileCertificatePageRoutingModule } from './domicile-certificate-routing.module';

import { DomicileCertificatePage } from './domicile-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicileCertificatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DomicileCertificatePage]
})
export class DomicileCertificatePageModule {}
