import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletBalanceManagePageRoutingModule } from './wallet-balance-manage-routing.module';

import { WalletBalanceManagePage } from './wallet-balance-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletBalanceManagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [WalletBalanceManagePage]
})
export class WalletBalanceManagePageModule {}
