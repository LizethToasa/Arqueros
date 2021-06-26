import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoAvancePage } from './listado-avance.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoAvancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoAvancePageRoutingModule {}
