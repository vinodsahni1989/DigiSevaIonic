import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HandicapDetailsPageRoutingModule } from './handicap-details-routing.module';

import { HandicapDetailsPage } from './handicap-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HandicapDetailsPageRoutingModule
  ],
  declarations: [HandicapDetailsPage]
})
export class HandicapDetailsPageModule {}
