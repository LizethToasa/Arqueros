import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../interfaces/solicitud.interface';
import { ArqueroService } from '../../servicios/arquero.service';
import * as firebase from 'firebase';
import { DatosUsuario } from '../../interfaces/user.interface';

@Component({
  selector: 'app-solicitudes-entrenamiento',
  templateUrl: './solicitudes-entrenamiento.page.html',
  styleUrls: ['./solicitudes-entrenamiento.page.scss'],
})
export class SolicitudesEntrenamientoPage implements OnInit {
  solicitudes: Solicitud[];
  arqueros: DatosUsuario[];
  usuarioId: string;
  espera = "espera";
  aceptar = "aceptar";
  rechazar = "rechazar";
  anulado = "anulado";
  constructor(private usuarioService: ArqueroService) {
    this.usuarioId = firebase.auth().currentUser.uid;
    this.usuarioService.getSolicitudes().subscribe((solicit) =>{
      this.solicitudes = solicit.filter(soli=>soli.entrenador == this.usuarioId); 
    
    });
    this.usuarioService.getArqueros().subscribe(usuario => {
      this.arqueros = usuario;
    });
   }

  ngOnInit() {
  }

}
