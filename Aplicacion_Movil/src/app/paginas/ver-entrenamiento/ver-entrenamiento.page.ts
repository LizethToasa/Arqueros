import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController, LoadingController } from '@ionic/angular';
import { Solicitud } from '../../interfaces/solicitud.interface';
import { ActivatedRoute} from '@angular/router';
import { ArqueroService } from '../../servicios/arquero.service';
import { EntrenadorService } from '../../servicios/entrenador.service';
@Component({
  selector: 'app-ver-entrenamiento',
  templateUrl: './ver-entrenamiento.page.html',
  styleUrls: ['./ver-entrenamiento.page.scss'],
})
export class VerEntrenamientoPage implements OnInit {
  idsolicitud:string;
  solicitud: Solicitud;
  entrenador:string;
  espera = "espera";
  aceptar = "aceptar";
  rechazar = "rechazar";
  anulado = "anulado";
  constructor(private nav: NavController,private alertCtrl: AlertController,private route: ActivatedRoute,private ArqueroService: ArqueroService,private entrenadorService: EntrenadorService) {
    this.idsolicitud=this.route.snapshot.params['id'];
    this.ArqueroService.getSolicitud(this.idsolicitud).subscribe((solicitud) =>{
      this.solicitud = solicitud;
    
    })
   }

  ngOnInit() {
  }

}
