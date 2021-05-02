import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicutudPageRoutingModule } from './solicutud-routing.module';

import { SolicutudPage } from './solicutud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicutudPageRoutingModule
  ],
  declarations: [SolicutudPage]
})
export class SolicutudPageModule {}
