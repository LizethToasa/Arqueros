import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnularSolicitudesPage } from './anular-solicitudes.page';

const routes: Routes = [
  {
    path: '',
    component: AnularSolicitudesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnularSolicitudesPageRoutingModule {}
