import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlobalOnlineFormPageRoutingModule } from './global-online-form-routing.module';

import { GlobalOnlineFormPage } from './global-online-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalOnlineFormPageRoutingModule
  ],
  declarations: [GlobalOnlineFormPage]
})
export class GlobalOnlineFormPageModule {}
