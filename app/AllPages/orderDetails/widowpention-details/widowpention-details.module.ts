import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WidowpentionDetailsPageRoutingModule } from './widowpention-details-routing.module';

import { WidowpentionDetailsPage } from './widowpention-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WidowpentionDetailsPageRoutingModule
  ],
  declarations: [WidowpentionDetailsPage]
})
export class WidowpentionDetailsPageModule {}
