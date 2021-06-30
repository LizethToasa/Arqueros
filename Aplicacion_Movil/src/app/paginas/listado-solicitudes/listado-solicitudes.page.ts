import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../interfaces/solicitud.interface';
import { ArqueroService } from '../../servicios/arquero.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-listado-solicitudes',
  templateUrl: './listado-solicitudes.page.html',
  styleUrls: ['./listado-solicitudes.page.scss'],
})
export class ListadoSolicitudesPage implements OnInit {
  solicitudes: Solicitud[];
  usuarioId: string;
  espera = "espera";
  aceptar = "aceptar";
  rechazar = "rechazar";
  anulado = "anulado";
  constructor(private usuarioService: ArqueroService) { 
    this.usuarioId = firebase.auth().currentUser.uid;
    this.usuarioService.getSolicitudes().subscribe((solicit) =>{
      this.solicitudes = solicit.filter(soli=>soli.idusuario == this.usuarioId); 
    });
  }

  ngOnInit() {
  }

}
