import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanCardFormPage } from './pan-card-form.page';

const routes: Routes = [
  {
    path: '',
    component: PanCardFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanCardFormPageRoutingModule {}
