import { Component, OnInit } from '@angular/core';
import { ArqueroService } from '../../servicios/arquero.service';
import { NotificacionEntrenador } from '../../interfaces/notificacion-entrenador.interface';
import { ActivatedRoute} from '@angular/router';
import { Solicitud } from '../../interfaces/solicitud.interface';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { formatDate } from "@angular/common";
import { NotificacionArquero } from '../../interfaces/notificacion-arquero.interface';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { NavController, LoadingController } from '@ionic/angular';
import { EntrenadorService} from '../../servicios/entrenador.service';
@Component({
  selector: 'app-ver-notifi',
  templateUrl: './ver-notifi.page.html',
  styleUrls: ['./ver-notifi.page.scss'],
})
export class VerNotifiPage implements OnInit {
  idnotificacion:string;
  notificacion: NotificacionEntrenador;
  cont = 1;
  solicitud: Solicitud;
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
  constructor(private entrenadorService: EntrenadorService,private alertCtrl: AlertController, public formBuilder: FormBuilder,private usuarioService: ArqueroService,private route: ActivatedRoute,private nav: NavController) { 
    this.idnotificacion=this.route.snapshot.params['id'];
    this.usuarioId = firebase.auth().currentUser.uid;
    this.usuarioService.getNotificacionEntrenador(this.idnotificacion).subscribe(notificacion => {
      this.notificacion= notificacion
      this.notificacion.color = "#FFFFFF";
      if(this.cont = 1){
        this.usuarioService.updateNotificacionEntrenador(this.notificacion,this.idnotificacion);
        this.cont = 2;
        this.usuarioService.getSolicitudes2(this.notificacion.idsolicitud).subscribe(solicitud => {
          this.solicitud =solicitud[0];
        });

      }
    });
    this.entrenadorService.getEntrenador(this.usuarioId).subscribe(usuario => {
      this.notificacionarquero.nombreentrenador = usuario.nombres + " " + usuario.apellidos;
    });
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

  async guardarentrenamiento(id){
    this.notificacionarquero.identrenador = this.usuarioId;
    this.notificacionarquero.mensaje = this.solicitud.mensajerespuesta;
    this.notificacionarquero.respuesta = this.solicitud.respuesta;
    this.notificacionarquero.idsolicitud = id;
    this.notificacionarquero.idarquero = this.solicitud.idusuario;
      this.usuarioService.updateSolicitud(this.solicitud, id).then(() => {
        this.usuarioService.addNotificacionArquero(this.notificacionarquero).then(() => {
          this.nav.navigateForward('notificaciones-entrenador'); 
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
