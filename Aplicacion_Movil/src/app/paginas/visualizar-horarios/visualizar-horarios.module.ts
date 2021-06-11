import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarHorariosPageRoutingModule } from './visualizar-horarios-routing.module';

import { VisualizarHorariosPage } from './visualizar-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarHorariosPageRoutingModule
  ],
  declarations: [VisualizarHorariosPage]
})
export class VisualizarHorariosPageModule {}
