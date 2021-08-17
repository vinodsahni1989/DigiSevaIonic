import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasteDetailsPage } from './caste-details.page';

const routes: Routes = [
  {
    path: '',
    component: CasteDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasteDetailsPageRoutingModule {}
