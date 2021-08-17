import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RationcardDetailsPageRoutingModule } from './rationcard-details-routing.module';

import { RationcardDetailsPage } from './rationcard-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RationcardDetailsPageRoutingModule
  ],
  declarations: [RationcardDetailsPage]
})
export class RationcardDetailsPageModule {}
