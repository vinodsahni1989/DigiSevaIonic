import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomeDetailsPage } from './income-details.page';

const routes: Routes = [
  {
    path: '',
    component: IncomeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomeDetailsPageRoutingModule {}
