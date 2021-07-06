import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerNotiPageRoutingModule } from './ver-noti-routing.module';

import { VerNotiPage } from './ver-noti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerNotiPageRoutingModule
  ],
  declarations: [VerNotiPage]
})
export class VerNotiPageModule {}
