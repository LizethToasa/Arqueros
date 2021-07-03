import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatosUsuario } from '../../interfaces/user.interface';
import { Horario } from '../../interfaces/horario.interface';
import { DatosEntrenador } from '../../interfaces/entrenador.interface';
import { NotificacionEntrenador } from '../../interfaces/notificacion-entrenador.interface';
import { Solicitud } from '../../interfaces/solicitud.interface';
import { ArqueroService } from '../../servicios/arquero.service';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { formatDate } from "@angular/common";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {
  format = 'EEEE';
  locale = 'en-US';
  fechaactual = formatDate(new Date() , "dd/MM/yyyy", this.locale);
  usuarioId= null;
  usuario: DatosUsuario={
    uid: '',
    correo: '',
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    telefono2: '',
    estado:'',
    foto:'',
    fecha_naciento:'',
    tipo:'',
    ficha:''
  }
  hora:any;
  entrenadores:DatosEntrenador[];
  hararios: Horario[];
  solicitud:Solicitud={
    nombresol: '',
    fechasol: '',
    fecha:new Date(),
    entrenador: '',
    horario: '',
    mensaje: '',
    idusuario:'',
    respuesta: 'espera',
    mensajerespuesta:'',
    idenlace:''

  };
  notificacionentrenador:NotificacionEntrenador={
    identrenador: '',
    fecha: '',
    fecha2: new Date(),
    color: "#EEEEEE",
    idsolicitud: '',
    nombrearquero:'',
    mensaje:'',
  };
  formGroup: FormGroup;
  fechahoy:any;
  mensaje=null;
  seleccion1 : boolean =true;
  idenlace:string;
  constructor(private usuarioService: ArqueroService,private entrenadorService: EntrenadorService,public formBuilder: FormBuilder,private nav: NavController,private alertCtrl: AlertController) {
    var fec = this.fechaactual.toString();
    this.solicitud.fechasol=fec;
    this.notificacionentrenador.fecha = fec;
    console.log(this.solicitud.fecha);
    this.entrenadorService.getactivos().subscribe((entrenador) =>{
      this.entrenadores = entrenador;
    });
    this.crearvalidaciones();

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.idenlace = result;
  
 
   }

  ngOnInit() {
    this.usuarioId = firebase.auth().currentUser.uid;
    if (this.usuarioId){
      this.cargarUsuario();
     
    } 
  }

  async seleprofe(){
    if(this.solicitud.entrenador == "" || this.solicitud.entrenador == undefined){
      console.log("Vacio");
    }else{
      this.fechahoy = formatDate(new Date() , "dd/MM/yyyy", this.locale);
      this.seleccion1 = false;
      this.formGroup.controls['hora'].setValue(null);
      this.entrenadorService.getHorariosactual(this.solicitud.entrenador,this.fechahoy).subscribe((horario) =>{
        this.hararios = horario
      });
    }
  }

  crearvalidaciones(){
    const profesor = new FormControl('', Validators.compose([
        Validators.required,
    ]));
    const hora = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const mensaje = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]));
    this.formGroup = this.formBuilder.group({profesor,hora,mensaje});
  }

  async cargarUsuario(){
    this.usuarioService.getArquero(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
      this.solicitud.idusuario=this.usuarioId;
      this.solicitud.nombresol=this.usuario.nombre+' '+this.usuario.apellido
    });
  }

  async crearSolicitud(){
    this.solicitud.idenlace = this.idenlace;
    this.notificacionentrenador.idsolicitud = this.idenlace;
    this.notificacionentrenador.identrenador = this.solicitud.entrenador;
    this.notificacionentrenador.mensaje = this.solicitud.mensaje
    this.notificacionentrenador.nombrearquero = this.usuario.nombre +" "+this.usuario.apellido;
    this.usuarioService.addSolicitud(this.solicitud).then(() => {
      this.usuarioService.addNotificacionEntrenador(this.notificacionentrenador).then(() => {
        this.nav.navigateForward('listado-solicitudes'); 
        this.mensaje="Se envió correctamente la solicitud de entrenamiento.";
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
