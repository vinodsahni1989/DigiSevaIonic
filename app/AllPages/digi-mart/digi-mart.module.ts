import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigiMartPageRoutingModule } from './digi-mart-routing.module';

import { DigiMartPage } from './digi-mart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigiMartPageRoutingModule
  ],
  declarations: [DigiMartPage]
})
export class DigiMartPageModule {}
