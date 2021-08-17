import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpshramikDetailsPageRoutingModule } from './upshramik-details-routing.module';

import { UpshramikDetailsPage } from './upshramik-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpshramikDetailsPageRoutingModule
  ],
  declarations: [UpshramikDetailsPage]
})
export class UpshramikDetailsPageModule {}
