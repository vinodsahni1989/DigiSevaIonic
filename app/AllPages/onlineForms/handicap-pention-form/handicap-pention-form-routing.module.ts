import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HandicapPentionFormPage } from './handicap-pention-form.page';

const routes: Routes = [
  {
    path: '',
    component: HandicapPentionFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HandicapPentionFormPageRoutingModule {}
