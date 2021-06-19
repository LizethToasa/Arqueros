import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoSolicitudesPageRoutingModule } from './listado-solicitudes-routing.module';

import { ListadoSolicitudesPage } from './listado-solicitudes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoSolicitudesPageRoutingModule
  ],
  declarations: [ListadoSolicitudesPage]
})
export class ListadoSolicitudesPageModule {}
