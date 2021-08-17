import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrivingLicenceFormPage } from './driving-licence-form.page';

const routes: Routes = [
  {
    path: '',
    component: DrivingLicenceFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrivingLicenceFormPageRoutingModule {}
