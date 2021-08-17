import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthDetailsPage } from './birth-details.page';

const routes: Routes = [
  {
    path: '',
    component: BirthDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthDetailsPageRoutingModule {}
