import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NotificacionEntrenador } from '../../interfaces/notificacion-entrenador.interface';
import { ArqueroService } from '../../servicios/arquero.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notifientrenador',
  templateUrl: './notifientrenador.component.html',
  styleUrls: ['./notifientrenador.component.scss'],
})
export class NotifientrenadorComponent implements OnInit {
  noti:string="../../../assets/notificaciones/notifica2.png";
  usuarioId=null;
  notificaciones:NotificacionEntrenador[];
  constructor(private usuarioService: ArqueroService,private localNotifications: LocalNotifications,private router: Router,) {
    this.usuarioId = firebase.auth().currentUser.uid;
    this.usuarioService.getNotificacionesEntrenador(this.usuarioId).subscribe(notifacion => {
      this.notificaciones = notifacion;
      if(this.notificaciones.length==0){
        this.noti="../../../assets/notificaciones/notifica2.png";
       }else{
        this.noti="../../../assets/notificaciones/notifi.png";
        this.notificacion();
       }
    
    });
   }

  ngOnInit() {}

  notificacion(){
    this.localNotifications.schedule({
      text: 'Tienes notificaciones pendientes que revisar.',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
   });

   this.localNotifications.on('click').subscribe(notification => {
    this.router.navigate(['notificaciones-entrenador']);
     });
  }

}
