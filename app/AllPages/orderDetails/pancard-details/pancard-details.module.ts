import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PancardDetailsPageRoutingModule } from './pancard-details-routing.module';

import { PancardDetailsPage } from './pancard-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PancardDetailsPageRoutingModule
  ],
  declarations: [PancardDetailsPage]
})
export class PancardDetailsPageModule {}
