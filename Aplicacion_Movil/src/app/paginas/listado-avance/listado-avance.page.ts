import { Component, OnInit } from '@angular/core';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { Avance } from '../../interfaces/avance.interface';
import * as firebase from 'firebase';
import { DatosUsuario } from '../../interfaces/user.interface';
import { ArqueroService} from '../../servicios/arquero.service';
@Component({
  selector: 'app-listado-avance',
  templateUrl: './listado-avance.page.html',
  styleUrls: ['./listado-avance.page.scss'],
})
export class ListadoAvancePage implements OnInit {
  avances: Avance[];
  usuarioId= null;
  arqueros: DatosUsuario[];
  pageActual: number= 1;
  constructor(private AvanceService: EntrenadorService,private usuarioService: ArqueroService) {
    this.usuarioId = firebase.auth().currentUser.uid;
    this.AvanceService.getAvancefecha().subscribe((avance) =>{
      this.avances = avance.filter(avan=>avan.identrenador == this.usuarioId); 
      console.log(this.avances);
    })
    this.usuarioService.getArqueros().subscribe(usuario => {
      this.arqueros = usuario;
    });
   }

  ngOnInit() {
  }

}
