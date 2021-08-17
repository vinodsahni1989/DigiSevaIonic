import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmkishanDetailsPageRoutingModule } from './pmkishan-details-routing.module';

import { PmkishanDetailsPage } from './pmkishan-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmkishanDetailsPageRoutingModule
  ],
  declarations: [PmkishanDetailsPage]
})
export class PmkishanDetailsPageModule {}
