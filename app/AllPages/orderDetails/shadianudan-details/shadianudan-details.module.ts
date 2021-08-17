import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShadianudanDetailsPageRoutingModule } from './shadianudan-details-routing.module';

import { ShadianudanDetailsPage } from './shadianudan-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShadianudanDetailsPageRoutingModule
  ],
  declarations: [ShadianudanDetailsPage]
})
export class ShadianudanDetailsPageModule {}
