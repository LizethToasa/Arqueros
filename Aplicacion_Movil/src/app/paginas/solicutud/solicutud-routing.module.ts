import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicutudPage } from './solicutud.page';

const routes: Routes = [
  {
    path: '',
    component: SolicutudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicutudPageRoutingModule {}
