import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpShopLicenceCertificatePage } from './up-shop-licence-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: UpShopLicenceCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpShopLicenceCertificatePageRoutingModule {}
