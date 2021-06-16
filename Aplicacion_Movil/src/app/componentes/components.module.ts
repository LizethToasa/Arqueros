import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotiComponent } from './noti/noti.component';

@NgModule({
  declarations: [
    NotiComponent
  ],
  exports:[
    NotiComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
