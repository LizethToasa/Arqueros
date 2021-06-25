import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerArqueroPage } from './ver-arquero.page';

const routes: Routes = [
  {
    path: '',
    component: VerArqueroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerArqueroPageRoutingModule {}
