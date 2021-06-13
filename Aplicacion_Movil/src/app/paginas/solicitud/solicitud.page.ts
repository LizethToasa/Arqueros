import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatosUsuario } from '../../interfaces/user.interface';
import { Horario } from '../../interfaces/horario.interface';
import { DatosEntrenador } from '../../interfaces/entrenador.interface';
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
    entrenador: '',
    horario: '',
    mensaje: ''
  };
  formGroup: FormGroup;
  fechahoy:any;
  mensaje=null;
  seleccion1 : boolean =true;
  constructor(private usuarioService: ArqueroService,private entrenadorService: EntrenadorService,public formBuilder: FormBuilder,private nav: NavController,private alertCtrl: AlertController) {
    console.log(this.fechaactual);
    var fec = this.fechaactual.toString();
    this.solicitud.fechasol=fec;
    this.entrenadorService.getactivos().subscribe((entrenador) =>{
      this.entrenadores = entrenador;
    });
    this.crearvalidaciones();
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
        console.log(this.hararios);
      });
    }
  }

  //Crear validaciones para el form 
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

  //Cargar usuario
  async cargarUsuario(){
    this.usuarioService.getArquero(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
      this.solicitud.nombresol=this.usuario.nombre+this.usuario.apellido
    });
  }

  async crearSolicitud(){
    console.log(this.solicitud.entrenador,this.solicitud.horario,this.solicitud.mensaje);
    this.usuarioService.addSolicitud(this.solicitud).then(() => {
      this.nav.navigateForward('menu-arquero'); 
      this.mensaje="Se envió correctamente la solicitud.";
      this.mensajeingreso();
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
