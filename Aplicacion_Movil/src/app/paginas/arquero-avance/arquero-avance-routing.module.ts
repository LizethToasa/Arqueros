import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArqueroAvancePage } from './arquero-avance.page';

const routes: Routes = [
  {
    path: '',
    component: ArqueroAvancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArqueroAvancePageRoutingModule {}
