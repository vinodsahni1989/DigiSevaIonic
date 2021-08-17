import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AproveUserPage } from './aprove-user.page';

const routes: Routes = [
  {
    path: '',
    component: AproveUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AproveUserPageRoutingModule {}
