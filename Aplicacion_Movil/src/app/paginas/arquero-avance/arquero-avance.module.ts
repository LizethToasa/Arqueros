import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArqueroAvancePageRoutingModule } from './arquero-avance-routing.module';

import { ArqueroAvancePage } from './arquero-avance.page';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArqueroAvancePageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [ArqueroAvancePage]
})
export class ArqueroAvancePageModule {}
