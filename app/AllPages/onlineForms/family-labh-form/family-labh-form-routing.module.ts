import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyLabhFormPage } from './family-labh-form.page';

const routes: Routes = [
  {
    path: '',
    component: FamilyLabhFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyLabhFormPageRoutingModule {}
