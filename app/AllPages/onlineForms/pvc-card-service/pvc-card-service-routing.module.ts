import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PvcCardServicePage } from './pvc-card-service.page';

const routes: Routes = [
  {
    path: '',
    component: PvcCardServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PvcCardServicePageRoutingModule {}
