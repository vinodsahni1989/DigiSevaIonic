import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UdhyogAdharCertificatePage } from './udhyog-adhar-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: UdhyogAdharCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UdhyogAdharCertificatePageRoutingModule {}
