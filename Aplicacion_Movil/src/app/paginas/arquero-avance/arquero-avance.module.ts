import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArqueroAvancePageRoutingModule } from './arquero-avance-routing.module';

import { ArqueroAvancePage } from './arquero-avance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArqueroAvancePageRoutingModule
  ],
  declarations: [ArqueroAvancePage]
})
export class ArqueroAvancePageModule {}
