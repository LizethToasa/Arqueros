import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerFichaPageRoutingModule } from './ver-ficha-routing.module';

import { VerFichaPage } from './ver-ficha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerFichaPageRoutingModule
  ],
  declarations: [VerFichaPage]
})
export class VerFichaPageModule {}
