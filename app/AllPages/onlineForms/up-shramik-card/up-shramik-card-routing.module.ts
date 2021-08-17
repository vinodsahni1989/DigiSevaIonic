import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpShramikCardPage } from './up-shramik-card.page';

const routes: Routes = [
  {
    path: '',
    component: UpShramikCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpShramikCardPageRoutingModule {}
