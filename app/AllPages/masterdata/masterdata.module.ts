import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterdataPageRoutingModule } from './masterdata-routing.module';

import { MasterdataPage } from './masterdata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterdataPageRoutingModule
  ],
  declarations: [MasterdataPage]
})
export class MasterdataPageModule {}
