import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerNotifiPage } from './ver-notifi.page';

const routes: Routes = [
  {
    path: '',
    component: VerNotifiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerNotifiPageRoutingModule {}
