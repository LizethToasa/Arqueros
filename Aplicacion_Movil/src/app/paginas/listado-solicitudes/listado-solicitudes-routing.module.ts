import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoSolicitudesPage } from './listado-solicitudes.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoSolicitudesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoSolicitudesPageRoutingModule {}
