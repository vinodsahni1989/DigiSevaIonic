import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadManagementPageRoutingModule } from './download-management-routing.module';

import { DownloadManagementPage } from './download-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadManagementPageRoutingModule
  ],
  declarations: [DownloadManagementPage]
})
export class DownloadManagementPageModule {}
