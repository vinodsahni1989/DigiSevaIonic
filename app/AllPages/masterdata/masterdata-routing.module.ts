import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterdataPage } from './masterdata.page';

const routes: Routes = [
  {
    path: '',
    component: MasterdataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterdataPageRoutingModule {}
