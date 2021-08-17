import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PvcCardServicePageRoutingModule } from './pvc-card-service-routing.module';

import { PvcCardServicePage } from './pvc-card-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PvcCardServicePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PvcCardServicePage]
})
export class PvcCardServicePageModule {}
