import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWalletRequestPage } from './add-wallet-request.page';

const routes: Routes = [
  {
    path: '',
    component: AddWalletRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWalletRequestPageRoutingModule {}
