import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeathCertificatePage } from './death-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: DeathCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeathCertificatePageRoutingModule {}
