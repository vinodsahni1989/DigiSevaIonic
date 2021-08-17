import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomeDetailsPageRoutingModule } from './income-details-routing.module';

import { IncomeDetailsPage } from './income-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncomeDetailsPageRoutingModule
  ],
  declarations: [IncomeDetailsPage]
})
export class IncomeDetailsPageModule {}
