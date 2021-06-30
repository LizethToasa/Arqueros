import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionesArqueroPage } from './notificaciones-arquero.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesArqueroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionesArqueroPageRoutingModule {}
