import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomicileDetailsPageRoutingModule } from './domicile-details-routing.module';

import { DomicileDetailsPage } from './domicile-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicileDetailsPageRoutingModule
  ],
  declarations: [DomicileDetailsPage]
})
export class DomicileDetailsPageModule {}
