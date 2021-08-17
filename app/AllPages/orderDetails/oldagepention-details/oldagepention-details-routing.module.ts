import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OldagepentionDetailsPage } from './oldagepention-details.page';

const routes: Routes = [
  {
    path: '',
    component: OldagepentionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OldagepentionDetailsPageRoutingModule {}
