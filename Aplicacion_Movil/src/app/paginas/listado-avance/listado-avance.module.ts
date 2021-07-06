import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoAvancePageRoutingModule } from './listado-avance-routing.module';

import { ListadoAvancePage } from './listado-avance.page';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoAvancePageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [ListadoAvancePage]
})
export class ListadoAvancePageModule {}
