import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuEntrenadorPageRoutingModule } from './menu-entrenador-routing.module';

import { MenuEntrenadorPage } from './menu-entrenador.page';
import { ComponentsModule } from '../../componentes/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuEntrenadorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuEntrenadorPage]
})
export class MenuEntrenadorPageModule {}
