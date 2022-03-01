import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { DatosUsuario } from '../../interfaces/user.interface';
import { ArqueroService} from '../../servicios/arquero.service';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-perfil-arquero',
  templateUrl: './perfil-arquero.page.html',
  styleUrls: ['./perfil-arquero.page.scss'],
})
export class PerfilArqueroPage implements OnInit {
  format = 'EEEE';
  locale = 'en-US';
  formGroup: FormGroup;
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
  public image: any;
  usuarioId= null;
  mensaje:string;

  age:any;
  showAge:any;
  ano:number;
  max:Date;
  min:Date;
  fechacumple:string;
  constructor(
    private usuarioService: ArqueroService,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private Service: AuthService,
    private route: ActivatedRoute, 
    private nav: NavController,
  ) {
      this.ano = new Date().getFullYear();
      var max = this.ano - 7;
      var min = this.ano - 30;
      var actual = "1/" + "1/" + max;
      var minima = "1/" + "1/" + min;
      this.min = new Date(minima);
      this.max = new Date(actual);
    this.crearvalidaciones();
   }
   fechanacim:Date;
  ngOnInit() {
    this.usuarioId = firebase.auth().currentUser.uid;
    if (this.usuarioId){
      this.cargarUsuario();
    } 
  }

  edad(event){
    var probar4 = formatDate(new Date(this.age) , "MM/dd/yyyy", this.locale);
    this.usuario.fecha_naciento = probar4.toString();
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
          }
        }
      ]
    });
    await alert.present();
  }

  async mensajeerror() {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      cssClass:'my-custom-class',
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
    this.nav.navigateForward('menu-arquero');
    this.mensaje="Se actualizó correctamente su perfil.";
    this.mensajeconfirmacion();
  }

  crearvalidaciones(){
    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$"),
    ]));

    const apellidoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$"),
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

    const telefono2Control = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));

    const fechaControl = new FormControl('', Validators.compose([
      Validators.minLength(7),
      
    ]));

    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl,telefono2Control,fechaControl});
  }

  async cargarUsuario(){
    this.usuarioService.getArquero(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
      this.fechanacim = new Date(this.usuario.fecha_naciento);   
    });
  }

  cambio(){ 
    var cadena = this.formGroup.get('nombreControl').value;
    var indices = [];
    for(var i = 0; i < cadena.length; i++) {
      if (cadena[i].toLowerCase() === " ") indices.push(i);
    }
    if(indices.length>1){
      var element = <HTMLInputElement> document.getElementById("dir");
      element.value = '';
      this.nombreerror();
    }
  }

  cambio2(){ 
    var cadena = this.formGroup.get('apellidoControl').value;
    var indices = [];
    for(var i = 0; i < cadena.length; i++) {
      if (cadena[i].toLowerCase() === " ") indices.push(i);
    }
    if(indices.length>1){
      var element = <HTMLInputElement> document.getElementById("dir2");
      element.value = '';
      this.apellidoerror();
    }
  }

  async nombreerror() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'El nombre ingresado tiene mas de 1 espacio volver a ingresarlo.',
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

  async apellidoerror() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'El apellido ingresado tiene mas de 1 espacio volver a ingresarlo.',
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


  async guardarUsuario() {
    if (this.usuarioId) {
      this.usuarioService.updateArquero(this.usuario, this.usuarioId).then(() => {
        this.nav.navigateForward('menu-arquero');
        this.mensaje="Se actualizó correctamente su perfil.";
        this.mensajeconfirmacion();
      });
    } 
  }

}
