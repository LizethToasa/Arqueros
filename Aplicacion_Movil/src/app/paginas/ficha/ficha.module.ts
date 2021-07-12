import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaPageRoutingModule } from './ficha-routing.module';

import { FichaPage } from './ficha.page';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaPageRoutingModule,
    ReactiveFormsModule,
    SignaturePadModule
  ],
  declarations: [FichaPage]
})
export class FichaPageModule {}
