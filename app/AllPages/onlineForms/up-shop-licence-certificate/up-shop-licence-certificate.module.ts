import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpShopLicenceCertificatePageRoutingModule } from './up-shop-licence-certificate-routing.module';

import { UpShopLicenceCertificatePage } from './up-shop-licence-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpShopLicenceCertificatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpShopLicenceCertificatePage]
})
export class UpShopLicenceCertificatePageModule {}
