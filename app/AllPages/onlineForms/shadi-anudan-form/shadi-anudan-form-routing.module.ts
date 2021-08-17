import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShadiAnudanFormPage } from './shadi-anudan-form.page';

const routes: Routes = [
  {
    path: '',
    component: ShadiAnudanFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShadiAnudanFormPageRoutingModule {}
