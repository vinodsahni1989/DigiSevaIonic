import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthCertificatePage } from './birth-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: BirthCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthCertificatePageRoutingModule {}
