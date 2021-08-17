import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidowPentionFormPage } from './widow-pention-form.page';

const routes: Routes = [
  {
    path: '',
    component: WidowPentionFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WidowPentionFormPageRoutingModule {}
