import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarHorariosPage } from './visualizar-horarios.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarHorariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarHorariosPageRoutingModule {}
