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
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    estado:'',
    foto:'',
    tipo:''
  }
  public image: any;
  usuarioId= null;
  mensaje:string;
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
      this.mensaje="Se envió un correo para cambiar la contraseña. ";
      this.mensajeerror();
    });
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];
    this.usuarioService.updateImagen(this.usuario,this.usuarioId,this.image);
    this.cargarUsuario();
  }

  crearvalidaciones(){
    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*"),
    ]));

    const apellidoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZÑñÁÉÍÓÚáéíóú]*"),
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

  //Cargar usuario
  async cargarUsuario(){
    this.usuarioService.getEntrenador(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  //Guardar Usuario
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
