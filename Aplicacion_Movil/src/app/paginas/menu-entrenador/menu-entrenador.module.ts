import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuEntrenadorPageRoutingModule } from './menu-entrenador-routing.module';

import { MenuEntrenadorPage } from './menu-entrenador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuEntrenadorPageRoutingModule
  ],
  declarations: [MenuEntrenadorPage]
})
export class MenuEntrenadorPageModule {}
