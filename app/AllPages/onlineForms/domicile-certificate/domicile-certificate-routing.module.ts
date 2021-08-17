import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomicileCertificatePage } from './domicile-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: DomicileCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomicileCertificatePageRoutingModule {}
