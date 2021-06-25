import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerHorarioPageRoutingModule } from './ver-horario-routing.module';

import { VerHorarioPage } from './ver-horario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerHorarioPageRoutingModule
  ],
  declarations: [VerHorarioPage]
})
export class VerHorarioPageModule {}
