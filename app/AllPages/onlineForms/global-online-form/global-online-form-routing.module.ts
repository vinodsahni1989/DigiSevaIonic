import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlobalOnlineFormPage } from './global-online-form.page';

const routes: Routes = [
  {
    path: '',
    component: GlobalOnlineFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalOnlineFormPageRoutingModule {}
