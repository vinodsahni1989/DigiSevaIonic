import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidowpentionDetailsPage } from './widowpention-details.page';

const routes: Routes = [
  {
    path: '',
    component: WidowpentionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WidowpentionDetailsPageRoutingModule {}
