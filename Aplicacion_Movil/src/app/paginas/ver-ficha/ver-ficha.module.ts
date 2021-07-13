import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerFichaPageRoutingModule } from './ver-ficha-routing.module';

import { VerFichaPage } from './ver-ficha.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VerFichaPageRoutingModule
  ],
  declarations: [VerFichaPage]
})
export class VerFichaPageModule {}
