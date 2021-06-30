import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionesArqueroPageRoutingModule } from './notificaciones-arquero-routing.module';

import { NotificacionesArqueroPage } from './notificaciones-arquero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionesArqueroPageRoutingModule
  ],
  declarations: [NotificacionesArqueroPage]
})
export class NotificacionesArqueroPageModule {}
