import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PancardDetailsPage } from './pancard-details.page';

const routes: Routes = [
  {
    path: '',
    component: PancardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PancardDetailsPageRoutingModule {}
