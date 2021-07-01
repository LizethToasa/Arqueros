import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionesEntrenadorPageRoutingModule } from './notificaciones-entrenador-routing.module';

import { NotificacionesEntrenadorPage } from './notificaciones-entrenador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionesEntrenadorPageRoutingModule
  ],
  declarations: [NotificacionesEntrenadorPage]
})
export class NotificacionesEntrenadorPageModule {}
