import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpShramikCardPageRoutingModule } from './up-shramik-card-routing.module';

import { UpShramikCardPage } from './up-shramik-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpShramikCardPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpShramikCardPage]
})
export class UpShramikCardPageModule {}
