import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilArqueroPageRoutingModule } from './perfil-arquero-routing.module';

import { PerfilArqueroPage } from './perfil-arquero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilArqueroPageRoutingModule
  ],
  declarations: [PerfilArqueroPage]
})
export class PerfilArqueroPageModule {}
