import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassportDetailsPageRoutingModule } from './passport-details-routing.module';

import { PassportDetailsPage } from './passport-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassportDetailsPageRoutingModule
  ],
  declarations: [PassportDetailsPage]
})
export class PassportDetailsPageModule {}
