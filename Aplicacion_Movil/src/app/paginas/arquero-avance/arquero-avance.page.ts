import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { Avance } from '../../interfaces/avance.interface';
import { DatosEntrenador } from '../../interfaces/entrenador.interface';
@Component({
  selector: 'app-arquero-avance',
  templateUrl: './arquero-avance.page.html',
  styleUrls: ['./arquero-avance.page.scss'],
})
export class ArqueroAvancePage implements OnInit {
  usuarioId= null;
  avances: Avance[];
  entrenadores: DatosEntrenador[];
  pageActual: number= 1;
  constructor(private AvanceService: EntrenadorService) {
    this.usuarioId = firebase.auth().currentUser.uid;
    this.AvanceService.getAvancefecha().subscribe((avance) =>{
      this.avances = avance.filter(avan=>avan.idarquero == this.usuarioId); 
    })
    this.AvanceService.getEntrenadores().subscribe((entrenadores) =>{
      this.entrenadores = entrenadores;
    })
   }
  

  ngOnInit() {
  }

}
