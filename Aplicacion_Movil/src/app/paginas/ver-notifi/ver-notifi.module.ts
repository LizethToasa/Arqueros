import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerNotifiPageRoutingModule } from './ver-notifi-routing.module';

import { VerNotifiPage } from './ver-notifi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerNotifiPageRoutingModule
  ],
  declarations: [VerNotifiPage]
})
export class VerNotifiPageModule {}
