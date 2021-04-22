import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAdministradorPageRoutingModule } from './registro-administrador-routing.module';

import { RegistroAdministradorPage } from './registro-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAdministradorPageRoutingModule
  ],
  declarations: [RegistroAdministradorPage]
})
export class RegistroAdministradorPageModule {}
