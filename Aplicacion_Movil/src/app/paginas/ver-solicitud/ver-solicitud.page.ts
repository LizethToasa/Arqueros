import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ArqueroService } from '../../servicios/arquero.service';
import { Solicitud } from '../../interfaces/solicitud.interface';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { AlertController } from '@ionic/angular';
import { NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.page.html',
  styleUrls: ['./ver-solicitud.page.scss'],
})
export class VerSolicitudPage implements OnInit {
  idsolicitud:string;
  solicitud: Solicitud;
  entrenador:string;
  espera = "espera";
  aceptar = "aceptar";
  rechazar = "rechazar";
  anulado = "anulado";
  constructor(
    private nav: NavController,private alertCtrl: AlertController,private route: ActivatedRoute,
    private ArqueroService: ArqueroService,private entrenadorService: EntrenadorService) { 
    this.idsolicitud=this.route.snapshot.params['id'];
    this.ArqueroService.getSolicitud(this.idsolicitud).subscribe((solicitud) =>{
      this.solicitud = solicitud;
      this.entrenadorService.getEntrenador(this.solicitud.entrenador).subscribe((entrenador) =>{
        this.entrenador = entrenador.nombres + " " +entrenador.apellidos;
      });
    })

  }

  ngOnInit() {
  }

  async confirmaranular() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: '¿Esta seguro de anular la solicitud de entrenamiento?',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.anularsolicitud()
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log();
          }
        }
      ]
    });
    await alert.present();
  }

  async confiirmarsolianu() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'Se anulo correctamente la solicitud de entrenamiento.',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
          
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log();
          }
        }
      ]
    });
    await alert.present();
  }

  async anularsolicitud(){
    this.solicitud.respuesta="anulado";
    if (this.idsolicitud) {
      this.ArqueroService.updateSolicitud(this.solicitud, this.idsolicitud).then(() => {
        this.nav.navigateForward('/menu-arquero');
        this.confiirmarsolianu();
      });
      
    }
   
  }



}
