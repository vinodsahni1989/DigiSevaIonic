import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UdhyogadharDetailsPage } from './udhyogadhar-details.page';

const routes: Routes = [
  {
    path: '',
    component: UdhyogadharDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UdhyogadharDetailsPageRoutingModule {}
