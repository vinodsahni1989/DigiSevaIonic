import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomeCertificatePage } from './income-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: IncomeCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomeCertificatePageRoutingModule {}
