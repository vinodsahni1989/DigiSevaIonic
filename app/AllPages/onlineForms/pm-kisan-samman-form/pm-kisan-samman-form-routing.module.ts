import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmKisanSammanFormPage } from './pm-kisan-samman-form.page';

const routes: Routes = [
  {
    path: '',
    component: PmKisanSammanFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmKisanSammanFormPageRoutingModule {}
