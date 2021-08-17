import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteridDetailsPageRoutingModule } from './voterid-details-routing.module';

import { VoteridDetailsPage } from './voterid-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoteridDetailsPageRoutingModule
  ],
  declarations: [VoteridDetailsPage]
})
export class VoteridDetailsPageModule {}
