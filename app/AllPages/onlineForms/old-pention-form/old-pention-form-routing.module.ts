import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OldPentionFormPage } from './old-pention-form.page';

const routes: Routes = [
  {
    path: '',
    component: OldPentionFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OldPentionFormPageRoutingModule {}
