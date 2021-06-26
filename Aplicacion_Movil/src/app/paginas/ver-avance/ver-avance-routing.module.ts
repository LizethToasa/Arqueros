import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerAvancePage } from './ver-avance.page';

const routes: Routes = [
  {
    path: '',
    component: VerAvancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerAvancePageRoutingModule {}
