import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeathCertificatePageRoutingModule } from './death-certificate-routing.module';

import { DeathCertificatePage } from './death-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeathCertificatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DeathCertificatePage]
})
export class DeathCertificatePageModule {}
