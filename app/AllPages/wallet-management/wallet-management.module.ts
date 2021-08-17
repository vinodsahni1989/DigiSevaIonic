import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletManagementPageRoutingModule } from './wallet-management-routing.module';

import { WalletManagementPage } from './wallet-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletManagementPageRoutingModule
  ],
  declarations: [WalletManagementPage]
})
export class WalletManagementPageModule {}
