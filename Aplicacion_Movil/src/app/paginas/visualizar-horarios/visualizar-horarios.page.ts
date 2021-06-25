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
  fechaactual = formatDate(new Date() , "dd/MM/yyyy", this.locale);;
  constructor(private Servicio:EntrenadorService,
    private route: ActivatedRoute) {
      var fecha = new Date();
      var dias = 1; // Número de días a agregar
      fecha.setDate(fecha.getDate() + dias);
      this.id = firebase.auth().currentUser.uid;
      this.fechahoy = formatDate(new Date(fecha) , "dd/MM/yyyy", this.locale);
      console.log(this.fechaactual);
      this.Servicio.getHorarioentrena().subscribe((horar) =>{
        this.horario = horar.filter(ho=>ho.idusuario == this.id); 
        console.log(this.horario[0].fecha);
      })
  
     }

  ngOnInit() {
  }

}
