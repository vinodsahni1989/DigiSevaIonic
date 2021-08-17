import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParivarikDetailsPage } from './parivarik-details.page';

const routes: Routes = [
  {
    path: '',
    component: ParivarikDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParivarikDetailsPageRoutingModule {}
