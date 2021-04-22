import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAdministradorPage } from './registro-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAdministradorPageRoutingModule {}
