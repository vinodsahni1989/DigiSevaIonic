import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomicileDetailsPage } from './domicile-details.page';

const routes: Routes = [
  {
    path: '',
    component: DomicileDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomicileDetailsPageRoutingModule {}
