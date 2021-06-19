import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnularSolicitudesPageRoutingModule } from './anular-solicitudes-routing.module';

import { AnularSolicitudesPage } from './anular-solicitudes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnularSolicitudesPageRoutingModule
  ],
  declarations: [AnularSolicitudesPage]
})
export class AnularSolicitudesPageModule {}
