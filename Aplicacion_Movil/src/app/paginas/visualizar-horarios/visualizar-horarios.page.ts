import { Component, OnInit } from '@angular/core';
import { Horario } from '../../interfaces/horario.interface';
import { ActivatedRoute } from '@angular/router';
import { EntrenadorService } from '../../servicios/entrenador.service';
import * as firebase from 'firebase';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-visualizar-horarios',
  templateUrl: './visualizar-horarios.page.html',
  styleUrls: ['./visualizar-horarios.page.scss'],
})
export class VisualizarHorariosPage implements OnInit {
  id: any;
  horario:  Horario[];
  format = 'EEEE';
  locale = 'en-US';
  fechahoy :any;
  
  constructor(private Servicio:EntrenadorService,
    private route: ActivatedRoute) {
      var fecha = new Date();
      var dias = 1; // Número de días a agregar
      fecha.setDate(fecha.getDate() + dias);
      this.id = firebase.auth().currentUser.uid;
      this.fechahoy = formatDate(new Date(fecha) , "dd/MM/yyyy", this.locale);
      this.Servicio.getHorariosactual(this.id,this.fechahoy).subscribe((horar) =>{
        this.horario = horar;
        console.log(this.horario);
      })
     }

  ngOnInit() {
  }

}
