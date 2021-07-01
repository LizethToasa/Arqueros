import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotiComponent } from './noti/noti.component';
import { NotifientrenadorComponent } from './notifientrenador/notifientrenador.component';
@NgModule({
  declarations: [
    NotiComponent,
    NotifientrenadorComponent
  ],
  exports:[
    NotiComponent,
    NotifientrenadorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
