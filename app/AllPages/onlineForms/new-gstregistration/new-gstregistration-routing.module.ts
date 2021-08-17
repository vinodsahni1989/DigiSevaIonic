import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewGSTRegistrationPage } from './new-gstregistration.page';

const routes: Routes = [
  {
    path: '',
    component: NewGSTRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGSTRegistrationPageRoutingModule {}
