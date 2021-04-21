import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilEntrenadorPage } from './perfil-entrenador.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilEntrenadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilEntrenadorPageRoutingModule {}
