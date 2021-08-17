import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShadianudanDetailsPage } from './shadianudan-details.page';

const routes: Routes = [
  {
    path: '',
    component: ShadianudanDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShadianudanDetailsPageRoutingModule {}
