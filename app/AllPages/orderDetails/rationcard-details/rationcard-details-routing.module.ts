import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RationcardDetailsPage } from './rationcard-details.page';

const routes: Routes = [
  {
    path: '',
    component: RationcardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RationcardDetailsPageRoutingModule {}
