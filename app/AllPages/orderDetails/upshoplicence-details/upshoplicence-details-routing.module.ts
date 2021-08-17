import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpshoplicenceDetailsPage } from './upshoplicence-details.page';

const routes: Routes = [
  {
    path: '',
    component: UpshoplicenceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpshoplicenceDetailsPageRoutingModule {}
