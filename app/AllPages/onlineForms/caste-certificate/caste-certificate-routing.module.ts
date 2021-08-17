import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasteCertificatePage } from './caste-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: CasteCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasteCertificatePageRoutingModule {}
