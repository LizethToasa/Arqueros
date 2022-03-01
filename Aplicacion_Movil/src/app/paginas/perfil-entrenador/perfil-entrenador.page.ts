import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { EntrenadorService} from '../../servicios/entrenador.service';
import { DatosEntrenador } from '../../interfaces/entrenador.interface';
import { AuthService } from '../../servicios/auth.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { nodeModuleNameResolver } from 'typescript';

@Component({
  selector: 'app-perfil-entrenador',
  templateUrl: './perfil-entrenador.page.html',
  styleUrls: ['./perfil-entrenador.page.scss'],
})
export class PerfilEntrenadorPage implements OnInit {
  formGroup: FormGroup;
  usuario: DatosEntrenador={
    uid: '',
    correo: '',
    nombres: '',
    apellidos: '',
    cedula: '',
    telefono: '',
    estado:'',
    foto:'',
    tipo:'',
    firma:''
  }
  public image: any;
  usuarioId= null;
  mensaje:string;
  str = "DelftStacks";
  constructor(
    private usuarioService: EntrenadorService,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private Service: AuthService,
    private route: ActivatedRoute, 
    private nav: NavController,
  ) {
    this.crearvalidaciones();
   }

  ngOnInit() {
    this.usuarioId = firebase.auth().currentUser.uid;
    if (this.usuarioId){
      this.cargarUsuario();
     
    } 
  }
  eventHandler(event) {
    console.log("")
    /*if(event.keyCode==32){
      var str2 = this.usuario.nombres.substring(0,  this.usuario.nombres.length - 1);
      this.str = str2;
      console.log(str2);
 
    
      //this.usuario.nombres=this.str;
    }*/
 } 

  async mensajeconfirmacion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensaje,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            //this.nav.navigateForward('menu');
          }
        }
      ]
    });
    await alert.present();
  }

  //Mostrar mensaje de alerta
  async mensajeerror() {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      cssClass:'my-custom-class',
      message: this.mensaje,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async cambiarcontra(){

    this.Service.resetPassword(this.usuario.correo).then(() => {
      this.mensaje="Se envió un mensaje a su correo para modificar la contraseña.";
      this.mensajeerror();
    });
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];
    this.usuarioService.updateImagen(this.usuario,this.usuarioId,this.image);
    //this.cargarUsuario();
    this.nav.navigateForward('menu-entrenador');
        this.mensaje="Se actualizó correctamente su perfil.";
        this.mensajeconfirmacion();
  }

  crearvalidaciones(){
    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú]+$"),
    ]));

    const apellidoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú]+$"),
    ]));

    const cedulaControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));

    const telefonoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));

 
    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl });
  }

  async cargarUsuario(){
    this.usuarioService.getEntrenador(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
     
    });
  }

  async guardarUsuario() {
    if (this.usuarioId) {
      this.usuarioService.updateEntrenador(this.usuario, this.usuarioId).then(() => {
        this.nav.navigateForward('menu-entrenador');
        this.mensaje="Se actualizó correctamente su perfil.";
        this.mensajeconfirmacion();
      });
    } 
  }

}
