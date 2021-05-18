import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarFirmaPageRoutingModule } from './cambiar-firma-routing.module';

import { CambiarFirmaPage } from './cambiar-firma.page';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarFirmaPageRoutingModule,
    SignaturePadModule
  ],
  declarations: [CambiarFirmaPage]
})
export class CambiarFirmaPageModule {}
