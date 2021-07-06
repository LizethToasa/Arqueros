import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NotificacionEntrenador } from '../../interfaces/notificacion-entrenador.interface';
import { ArqueroService } from '../../servicios/arquero.service';
@Component({
  selector: 'app-notificaciones-entrenador',
  templateUrl: './notificaciones-entrenador.page.html',
  styleUrls: ['./notificaciones-entrenador.page.scss'],
})
export class NotificacionesEntrenadorPage implements OnInit {
  usuarioId=null;
  notificaciones:NotificacionEntrenador[];
  constructor(private usuarioService: ArqueroService) {
    this.usuarioId = firebase.auth().currentUser.uid;
    this.usuarioService.getNotificacionEntrenadores().subscribe(notificacion => {
      this.notificaciones = notificacion.filter(noti=>noti.identrenador == this.usuarioId);     
    });
   }

  ngOnInit() {
  }


}
