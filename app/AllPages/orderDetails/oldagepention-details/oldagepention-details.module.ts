import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OldagepentionDetailsPageRoutingModule } from './oldagepention-details-routing.module';

import { OldagepentionDetailsPage } from './oldagepention-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OldagepentionDetailsPageRoutingModule
  ],
  declarations: [OldagepentionDetailsPage]
})
export class OldagepentionDetailsPageModule {}
