import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NotificacionEntrenador } from '../../interfaces/notificacion-entrenador.interface';
import { ArqueroService } from '../../servicios/arquero.service';
@Component({
  selector: 'app-notifientrenador',
  templateUrl: './notifientrenador.component.html',
  styleUrls: ['./notifientrenador.component.scss'],
})
export class NotifientrenadorComponent implements OnInit {
  noti:string="../../../assets/notificaciones/notifica2.png";
  usuarioId=null;
  notificaciones:NotificacionEntrenador[];
  constructor(private usuarioService: ArqueroService) {
    this.usuarioId = firebase.auth().currentUser.uid;
    this.usuarioService.getNotificacionesEntrenador(this.usuarioId).subscribe(notifacion => {
      if(notifacion.length==0){
        this.noti="../../../assets/notificaciones/notifica2.png";
       }else{
        this.noti="../../../assets/notificaciones/notifi.png";
       }
    
    });
   }

  ngOnInit() {}

}
