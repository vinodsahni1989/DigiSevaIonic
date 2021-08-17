import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigiMartPage } from './digi-mart.page';

const routes: Routes = [
  {
    path: '',
    component: DigiMartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigiMartPageRoutingModule {}
