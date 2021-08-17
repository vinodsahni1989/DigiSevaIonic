import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewgstDetailsPage } from './newgst-details.page';

const routes: Routes = [
  {
    path: '',
    component: NewgstDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewgstDetailsPageRoutingModule {}
