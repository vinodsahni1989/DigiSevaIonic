import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthDetailsPageRoutingModule } from './birth-details-routing.module';

import { BirthDetailsPage } from './birth-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirthDetailsPageRoutingModule
  ],
  declarations: [BirthDetailsPage]
})
export class BirthDetailsPageModule {}
