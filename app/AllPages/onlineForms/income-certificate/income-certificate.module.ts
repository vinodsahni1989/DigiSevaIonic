import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomeCertificatePageRoutingModule } from './income-certificate-routing.module';

import { IncomeCertificatePage } from './income-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncomeCertificatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [IncomeCertificatePage]
})
export class IncomeCertificatePageModule { }
