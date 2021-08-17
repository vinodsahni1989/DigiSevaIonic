import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigimartOrdersPageRoutingModule } from './digimart-orders-routing.module';

import { DigimartOrdersPage } from './digimart-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigimartOrdersPageRoutingModule
  ],
  declarations: [DigimartOrdersPage]
})
export class DigimartOrdersPageModule {}
