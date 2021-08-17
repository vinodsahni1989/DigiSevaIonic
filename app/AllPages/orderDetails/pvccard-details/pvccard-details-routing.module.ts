import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PvccardDetailsPage } from './pvccard-details.page';

const routes: Routes = [
  {
    path: '',
    component: PvccardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PvccardDetailsPageRoutingModule {}
