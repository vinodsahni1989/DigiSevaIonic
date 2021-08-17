import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletManagementPage } from './wallet-management.page';

const routes: Routes = [
  {
    path: '',
    component: WalletManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletManagementPageRoutingModule {}
