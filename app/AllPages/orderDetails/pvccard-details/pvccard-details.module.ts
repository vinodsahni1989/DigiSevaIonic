import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PvccardDetailsPageRoutingModule } from './pvccard-details-routing.module';

import { PvccardDetailsPage } from './pvccard-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PvccardDetailsPageRoutingModule
  ],
  declarations: [PvccardDetailsPage]
})
export class PvccardDetailsPageModule {}
