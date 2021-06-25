import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerHorarioPage } from './ver-horario.page';

const routes: Routes = [
  {
    path: '',
    component: VerHorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerHorarioPageRoutingModule {}
