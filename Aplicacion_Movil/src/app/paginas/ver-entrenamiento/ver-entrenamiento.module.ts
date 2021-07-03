import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerEntrenamientoPageRoutingModule } from './ver-entrenamiento-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VerEntrenamientoPage } from './ver-entrenamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VerEntrenamientoPageRoutingModule
  ],
  declarations: [VerEntrenamientoPage]
})
export class VerEntrenamientoPageModule {}
