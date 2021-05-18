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
    tipo:''
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

  ngOnInit() {
    this.usuarioId = firebase.auth().currentUser.uid;
    if (this.usuarioId){
      this.cargarUsuario();
     
    } 
  }

  edad(event){
    var probar4 = formatDate(new Date(this.age) , "MM/dd/yyyy", this.locale);
    this.fechacumple = probar4.toString();
    /*this.fechacumple=new Date(event.detail.value);  
    if(this.age){
      var fec = new Date(this.age);
      console.log(fec.getDay());
      const convertAge = new Date(this.age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
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
      this.mensaje="Se envió un correo para cambiar la contraseña. ";
      this.mensajeerror();
    });
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];
    this.usuarioService.updateImagen(this.usuario,this.usuarioId,this.image);
    this.cargarUsuario();
  }

  //Crear validaciones
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

    const emailControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(40)

    ]));
    const fechaControl = new FormControl('', Validators.compose([
      Validators.minLength(1),
      
    ]));

    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl,telefono2Control,fechaControl});
  }

  //Cargar usuario
  async cargarUsuario(){
    this.usuarioService.getArquero(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
      
      console.log(this.usuario);
      this.usuario.fecha_naciento= new Date(this.usuario.fecha_naciento);

      //this.usuario.fecha_naciento= new Date(this.usuario.fecha_naciento['seconds']*1000);
      /*const convertAge = new Date(this.usuario.fecha_naciento);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);*/
    
 
    });
  }

  //Guardar Usuario
  async guardarUsuario() {
    if (this.usuarioId) {
      this.usuario.fecha_naciento = this.fechacumple;
      this.usuarioService.updateArquero(this.usuario, this.usuarioId).then(() => {
        this.nav.navigateForward('menu-arquero');
        this.mensaje="Se actualizó correctamente su perfil.";
        this.mensajeconfirmacion();
      });
    } 
  }

}
