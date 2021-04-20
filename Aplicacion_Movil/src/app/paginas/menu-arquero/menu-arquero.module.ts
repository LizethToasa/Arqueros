import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuArqueroPageRoutingModule } from './menu-arquero-routing.module';

import { MenuArqueroPage } from './menu-arquero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuArqueroPageRoutingModule
  ],
  declarations: [MenuArqueroPage]
})
export class MenuArqueroPageModule {}
