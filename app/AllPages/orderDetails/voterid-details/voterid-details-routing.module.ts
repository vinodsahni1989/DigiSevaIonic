import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteridDetailsPage } from './voterid-details.page';

const routes: Routes = [
  {
    path: '',
    component: VoteridDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteridDetailsPageRoutingModule {}
