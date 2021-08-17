import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasportFormPage } from './pasport-form.page';

const routes: Routes = [
  {
    path: '',
    component: PasportFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasportFormPageRoutingModule {}
