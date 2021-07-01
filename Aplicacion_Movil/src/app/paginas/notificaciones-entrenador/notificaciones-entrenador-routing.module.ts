import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionesEntrenadorPage } from './notificaciones-entrenador.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesEntrenadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionesEntrenadorPageRoutingModule {}
