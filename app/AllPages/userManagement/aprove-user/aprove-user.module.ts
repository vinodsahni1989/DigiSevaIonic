import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AproveUserPageRoutingModule } from './aprove-user-routing.module';

import { AproveUserPage } from './aprove-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AproveUserPageRoutingModule
  ],
  declarations: [AproveUserPage]
})
export class AproveUserPageModule {}
