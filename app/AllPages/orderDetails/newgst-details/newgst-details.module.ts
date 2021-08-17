import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewgstDetailsPageRoutingModule } from './newgst-details-routing.module';

import { NewgstDetailsPage } from './newgst-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewgstDetailsPageRoutingModule
  ],
  declarations: [NewgstDetailsPage]
})
export class NewgstDetailsPageModule {}
