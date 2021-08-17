import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParivarikDetailsPageRoutingModule } from './parivarik-details-routing.module';

import { ParivarikDetailsPage } from './parivarik-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParivarikDetailsPageRoutingModule
  ],
  declarations: [ParivarikDetailsPage]
})
export class ParivarikDetailsPageModule {}
