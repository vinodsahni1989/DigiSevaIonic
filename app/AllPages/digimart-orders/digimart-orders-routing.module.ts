import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigimartOrdersPage } from './digimart-orders.page';

const routes: Routes = [
  {
    path: '',
    component: DigimartOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigimartOrdersPageRoutingModule {}
