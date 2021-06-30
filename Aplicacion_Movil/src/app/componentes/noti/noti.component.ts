import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NotificacionArquero } from '../../interfaces/notificacion-arquero.interface';
import { ArqueroService } from '../../servicios/arquero.service';
@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.scss'],
})
export class NotiComponent implements OnInit {
  noti:string="../../../assets/notificaciones/notifica2.png";
  usuarioId=null;
  constructor(private usuarioService: ArqueroService) {
    this.usuarioId = firebase.auth().currentUser.uid;
    this.usuarioService.getNotificaciones(this.usuarioId).subscribe(notifacion => {
      console.log(notifacion);
     if(notifacion.length==0){
      this.noti="../../../assets/notificaciones/notifica2.png";
     }else{
      this.noti="../../../assets/notificaciones/notifi.png";
     }
    });
   }

  ngOnInit() {}

}
