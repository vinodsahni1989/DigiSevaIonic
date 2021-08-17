import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassportDetailsPage } from './passport-details.page';

const routes: Routes = [
  {
    path: '',
    component: PassportDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassportDetailsPageRoutingModule {}
