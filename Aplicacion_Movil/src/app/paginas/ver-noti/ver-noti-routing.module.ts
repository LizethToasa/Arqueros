import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerNotiPage } from './ver-noti.page';

const routes: Routes = [
  {
    path: '',
    component: VerNotiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerNotiPageRoutingModule {}
