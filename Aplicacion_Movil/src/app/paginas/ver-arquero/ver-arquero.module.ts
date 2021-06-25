import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerArqueroPageRoutingModule } from './ver-arquero-routing.module';

import { VerArqueroPage } from './ver-arquero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerArqueroPageRoutingModule
  ],
  declarations: [VerArqueroPage]
})
export class VerArqueroPageModule {}
