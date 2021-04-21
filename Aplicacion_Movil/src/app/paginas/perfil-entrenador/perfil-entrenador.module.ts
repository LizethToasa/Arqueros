import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilEntrenadorPageRoutingModule } from './perfil-entrenador-routing.module';

import { PerfilEntrenadorPage } from './perfil-entrenador.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PerfilEntrenadorPageRoutingModule
  ],
  declarations: [PerfilEntrenadorPage]
})
export class PerfilEntrenadorPageModule {}
