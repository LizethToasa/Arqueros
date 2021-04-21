import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilArqueroPage } from './perfil-arquero.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilArqueroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilArqueroPageRoutingModule {}
