import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UdhyogadharDetailsPageRoutingModule } from './udhyogadhar-details-routing.module';

import { UdhyogadharDetailsPage } from './udhyogadhar-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UdhyogadharDetailsPageRoutingModule
  ],
  declarations: [UdhyogadharDetailsPage]
})
export class UdhyogadharDetailsPageModule {}
