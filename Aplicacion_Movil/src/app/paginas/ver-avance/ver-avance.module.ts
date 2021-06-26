import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerAvancePageRoutingModule } from './ver-avance-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VerAvancePage } from './ver-avance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VerAvancePageRoutingModule
  ],
  declarations: [VerAvancePage]
})
export class VerAvancePageModule {}
