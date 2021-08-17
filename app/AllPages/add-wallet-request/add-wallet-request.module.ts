import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWalletRequestPageRoutingModule } from './add-wallet-request-routing.module';

import { AddWalletRequestPage } from './add-wallet-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWalletRequestPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddWalletRequestPage]
})
export class AddWalletRequestPageModule {}
