import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController, LoadingController } from '@ionic/angular';
import { Solicitud } from '../../interfaces/solicitud.interface';
import { ActivatedRoute} from '@angular/router';
import { ArqueroService } from '../../servicios/arquero.service';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotificacionArquero } from '../../interfaces/notificacion-arquero.interface';
import { formatDate } from "@angular/common";
import * as firebase from 'firebase';
@Component({
  selector: 'app-ver-entrenamiento',
  templateUrl: './ver-entrenamiento.page.html',
  styleUrls: ['./ver-entrenamiento.page.scss'],
})
export class VerEntrenamientoPage implements OnInit {
  idsolicitud:string;
  solicitud: Solicitud;
  entrenador:string;
  formGroup: FormGroup;
  format = 'EEEE';
  locale = 'en-US';
  notificacionarquero:NotificacionArquero={
    fecha: formatDate(new Date() , "dd/MM/yyyy", this.locale),
    fecha2: new Date(),
    color: "#EEEEEE",
    idsolicitud:'',
    identrenador:'',
    idarquero:'',
    nombreentrenador:'',
    mensaje:'',
    respuesta:'',
  };
  usuarioId= null;
  mensaje=null;
  constructor(public formBuilder: FormBuilder,private nav: NavController,private alertCtrl: AlertController,private route: ActivatedRoute,private ArqueroService: ArqueroService,private entrenadorService: EntrenadorService) {
    this.idsolicitud=this.route.snapshot.params['id'];
    this.usuarioId = firebase.auth().currentUser.uid;
    this.ArqueroService.getSolicitud(this.idsolicitud).subscribe((solicitud) =>{
      this.solicitud = solicitud;
    
    })
    this.crearvalidaciones();
   }

  ngOnInit() {
  }

  crearvalidaciones(){
    const respuesta = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]));
 
    const mensaje = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]));
    
    this.formGroup = this.formBuilder.group({respuesta,mensaje});
  }

  async guardarentrenamiento(){
    this.notificacionarquero.identrenador = this.usuarioId;
    this.notificacionarquero.mensaje = this.solicitud.mensajerespuesta;
    this.notificacionarquero.respuesta = this.solicitud.respuesta;
    this.notificacionarquero.idsolicitud = this.idsolicitud;
    this.notificacionarquero.idarquero = this.solicitud.idusuario;
    this.ArqueroService.updateSolicitud(this.solicitud, this.idsolicitud).then(() => {
      this.ArqueroService.addNotificacionArquero(this.notificacionarquero).then(() => {
        this.nav.navigateForward('listado-solicitudes'); 
        this.mensaje="Se respondió correctamente la solicitud de entrenamiento.";
        this.mensajeingreso();
      });

    });
  }

  async mensajeingreso() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensaje,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

}
