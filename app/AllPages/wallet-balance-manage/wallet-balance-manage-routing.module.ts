import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletBalanceManagePage } from './wallet-balance-manage.page';

const routes: Routes = [
  {
    path: '',
    component: WalletBalanceManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletBalanceManagePageRoutingModule {}
