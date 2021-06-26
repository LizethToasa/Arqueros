import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoAvancePageRoutingModule } from './listado-avance-routing.module';

import { ListadoAvancePage } from './listado-avance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoAvancePageRoutingModule
  ],
  declarations: [ListadoAvancePage]
})
export class ListadoAvancePageModule {}
