import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import * as firebase from 'firebase';
import { Horario } from '../../interfaces/horario.interface';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  fechamanana :any;
  format = 'EEEE';
  locale = 'en-US';
  horaentrada :any;
  horasalida: any;
  seleccion1 : boolean =true;
  usuarioId= null;
  horario:Horario ={
    idusuario :'',
    horaentrada: '',
    horasalida: '',
    fecha: ''
  }
  mensaje:any;
  formGroup: FormGroup; 
  constructor(public formBuilder: FormBuilder,private HorarioService: EntrenadorService,private nav: NavController,private alertCtrl: AlertController) { 
    var fecha = new Date();
    var dias = 1; // Número de días a agregar
    fecha.setDate(fecha.getDate() + dias);
    this.fechamanana = formatDate(new Date(fecha) , "dd/MM/yyyy", this.locale);
    this.horario.fecha = this.fechamanana;
    console.log(this.horario.fecha);
    this.crearvalidaciones();
  }

  ngOnInit() {
    this.usuarioId = firebase.auth().currentUser.uid;
    this.horario.idusuario = this.usuarioId;
  }

  //Crear validaciones para el form 
  crearvalidaciones(){
    const horaentr = new FormControl('', Validators.compose([
        Validators.required,


    ]));
    const horasal = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    
    this.formGroup = this.formBuilder.group({horaentr,horasal});
  }

  horaentre(event){
    var horas = new Date(event.detail.value).getHours().toString();
    if(horas=="6"||horas=="7"||horas=="8"||horas=="9"){
      horas="0"+horas;
    }
    var minutos= new Date(event.detail.value).getMinutes().toString();
    if(minutos=="1"||minutos=="2"||minutos=="3"||minutos=="4"||minutos=="5"||minutos=="6"||minutos=="7"||minutos=="8"||minutos=="9"||minutos=="0"){
      minutos="0"+minutos;
    }
    this.horaentrada= horas+':'+minutos;
    this.horario.horaentrada = horas+':'+minutos;
    this.seleccion1 = false;
    this.formGroup.controls['horasal'].setValue(null);
  }
  horasali(event){
    var horas = new Date(event.detail.value).getHours().toString();
    if(horas=="6"||horas=="7"||horas=="8"||horas=="9"){
      horas="0"+horas;
    }
    var minutos= new Date(event.detail.value).getMinutes().toString();
    if(minutos=="1"||minutos=="2"||minutos=="3"||minutos=="4"||minutos=="5"||minutos=="6"||minutos=="7"||minutos=="8"||minutos=="9"||minutos=="0"){
      minutos="0"+minutos;
    }
    this.horasalida= horas+':'+minutos;
    this.horario.horasalida = horas+':'+minutos;
  }

  async crearHorario(){
    this.HorarioService.addHorario(this.horario).then(() => {
      this.nav.navigateForward('menu-entrenador'); 
      this.mensaje="Se envió correctamente el horario.";
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
