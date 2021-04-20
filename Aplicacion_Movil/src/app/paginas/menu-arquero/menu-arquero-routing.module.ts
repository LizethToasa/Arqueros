import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuArqueroPage } from './menu-arquero.page';

const routes: Routes = [
  {
    path: '',
    component: MenuArqueroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuArqueroPageRoutingModule {}
