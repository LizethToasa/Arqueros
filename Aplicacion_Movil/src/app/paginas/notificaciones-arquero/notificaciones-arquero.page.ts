import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NotificacionArquero } from '../../interfaces/notificacion-arquero.interface';
import { ArqueroService } from '../../servicios/arquero.service';
@Component({
  selector: 'app-notificaciones-arquero',
  templateUrl: './notificaciones-arquero.page.html',
  styleUrls: ['./notificaciones-arquero.page.scss'],
})
export class NotificacionesArqueroPage implements OnInit {
  usuarioId=null;
  notificaciones:NotificacionArquero[];
  constructor(private usuarioService: ArqueroService) { 
    this.usuarioId = firebase.auth().currentUser.uid;
    this.usuarioService.getNotificacionesArquero().subscribe(notificacion => {
      this.notificaciones = notificacion.filter(noti=>noti.idarquero == this.usuarioId);     
      console.log(this.notificaciones);
    });
  }

  ngOnInit() {
  }
   
}
