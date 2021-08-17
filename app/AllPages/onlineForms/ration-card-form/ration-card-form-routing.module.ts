import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RationCardFormPage } from './ration-card-form.page';

const routes: Routes = [
  {
    path: '',
    component: RationCardFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RationCardFormPageRoutingModule {}
