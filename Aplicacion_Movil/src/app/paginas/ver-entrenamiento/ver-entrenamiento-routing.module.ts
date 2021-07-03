import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerEntrenamientoPage } from './ver-entrenamiento.page';

const routes: Routes = [
  {
    path: '',
    component: VerEntrenamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerEntrenamientoPageRoutingModule {}
