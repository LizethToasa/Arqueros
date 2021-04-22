import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoArquerosPageRoutingModule } from './listado-arqueros-routing.module';

import { ListadoArquerosPage } from './listado-arqueros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoArquerosPageRoutingModule
  ],
  declarations: [ListadoArquerosPage]
})
export class ListadoArquerosPageModule {}
