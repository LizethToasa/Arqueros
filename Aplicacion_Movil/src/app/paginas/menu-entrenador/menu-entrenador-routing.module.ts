import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuEntrenadorPage } from './menu-entrenador.page';

const routes: Routes = [
  {
    path: '',
    component: MenuEntrenadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuEntrenadorPageRoutingModule {}
