import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-olvidar-contrasena',
  templateUrl: './olvidar-contrasena.page.html',
  styleUrls: ['./olvidar-contrasena.page.scss'],
})
export class OlvidarContrasenaPage implements OnInit {
  formolvidaste: FormGroup; 
  mensaje:string;
  mensajeconfir:string;
  constructor(
    private authSvc: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController) {
    this.crearvalidacionesform();
  }


  ngOnInit() {
  }
  //Crear validaciones
  crearvalidacionesform(){
    const emailControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(40)

    ]));
    this.formolvidaste = this.formBuilder.group({emailControl});
  }

  //Mensaje de alert de error
  async mensajeerror() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
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

  //Mensaje de alert de confirmacion
  async mensajeconfirmacion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensajeconfir,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.redireccionar();
          }
        }
      ]
    });
    await alert.present();
  }

  async enviarcorreo(email) {
    try {
      await this.authSvc.resetPassword(email.value);
      this.mensajeconfir="Se envió un mensaje para la recuperación de contraseña al correo ingresado.";
      this.mensajeconfirmacion();
      
    } catch (error) {
      if(error['message']=="There is no user record corresponding to this identifier. The user may have been deleted."){
        this.mensaje="El usuario ingresado no se encuentra registrado o se encuentra desabilitado.";
        this.mensajeerror();
      }
    }
  }

  async redireccionar(){
    this.router.navigate(['/login']);
  }


}
