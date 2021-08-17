import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasteDetailsPageRoutingModule } from './caste-details-routing.module';

import { CasteDetailsPage } from './caste-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasteDetailsPageRoutingModule
  ],
  declarations: [CasteDetailsPage]
})
export class CasteDetailsPageModule {


  
}
