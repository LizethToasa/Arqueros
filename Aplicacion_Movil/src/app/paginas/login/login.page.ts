import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;
  passwordTypeInput = 'password';
  usuario:string;
  contrasena:string;
  uid:string;
  mensaje:string;
  constructor(
    private authSvc: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    ) {
      this.crearvalidaciones();
    }

  ngOnInit() {
  }

   //Habilitar y deshabilitar la visualización del password
   showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }

  crearvalidaciones(){
    const emailControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(40)

    ]));
    const passwordControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
        Validators.maxLength(40)
    ]));
    this.formGroup = this.formBuilder.group({emailControl,passwordControl });
  }

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

  async onLogin() {
    try {
      
      const user = await this.authSvc.login(this.usuario,this.contrasena);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.uid = user.uid;
        this.redirectUser(isVerified, this.uid);
        
      }else{
        if(this.authSvc.errores=="The password is invalid or the user does not have a password."){
          this.mensaje="La contraseña es incorrecta.";
          this.mensajeerror();
        }else if(this.authSvc.errores=="There is no user record corresponding to this identifier. The user may have been deleted."){
          this.mensaje="El usuario no se encuentra registrado.";
          this.mensajeerror();
        }
      }
    }catch (error) {
      console.log('Error->', error['message']);
    }
  }

  private redirectUser(isVerified: boolean,id:string): void {
    if (isVerified) {
      this.authSvc.obtenerUsuario(id).subscribe(usuario => {
        //this.tienda = tienda;
   
        if (usuario === undefined) {
          this.mensaje="La cuenta de correo no tiene permisos para ingresar a estos módulos.";
          this.mensajeerror();
          //alert("El usuario no es de tipo cliente.");
        }else{
          if(usuario.estado=="Inactivo"){
            this.mensaje="El usuario esta inactivo.";
            this.mensajeerror();
            //alert("El usuario esta borrado");
          }else{
            this.router.navigate(['menu']);
          }
          
        }
      });
    } else {
      this.router.navigate(['verificar-email']);
    }
  }

}
