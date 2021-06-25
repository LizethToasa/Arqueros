import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoArquerosPage } from './listado-arqueros.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoArquerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoArquerosPageRoutingModule {}
