import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesEntrenamientoPageRoutingModule } from './solicitudes-entrenamiento-routing.module';

import { SolicitudesEntrenamientoPage } from './solicitudes-entrenamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesEntrenamientoPageRoutingModule
  ],
  declarations: [SolicitudesEntrenamientoPage]
})
export class SolicitudesEntrenamientoPageModule {}
