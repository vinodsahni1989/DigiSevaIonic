import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadManagementPage } from './download-management.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadManagementPageRoutingModule {}
