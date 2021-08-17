import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpshramikDetailsPage } from './upshramik-details.page';

const routes: Routes = [
  {
    path: '',
    component: UpshramikDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpshramikDetailsPageRoutingModule {}
