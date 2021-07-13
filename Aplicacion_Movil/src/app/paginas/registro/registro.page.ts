import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public formGroup: FormGroup;
  public passwordTypeInput = 'password';
  public mensaje:string;
  public image: any;
  age:any;
  showAge:any;
  ano:number;
  max:Date;
  min:Date;
  fechacumple:string;
  format = 'EEEE';
  locale = 'en-US';
  constructor(
    private authSvc: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController
    ) 
    {
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

    const emailControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(40)

    ]));
    const passwordControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(40),
      
    ]));
    const foto = new FormControl('', Validators.compose([
      Validators.required,
      
    ]));
    const fechaControl = new FormControl('', Validators.compose([
      Validators.required,
      
    ]));

    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl,telefono2Control,emailControl,passwordControl,foto,fechaControl });
  }

  edad(event){
    var probar4 = formatDate(new Date(this.age) , "MM/dd/yyyy", this.locale);
    this.fechacumple = probar4.toString();
  }

  enviarimagen(event: any): void {
    this.image = event.target.files[0];
  }

  async presentAlertConfirm() {
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

  async onRegister(email, password, nombre, apellido, cedula, telefono,telefono2) {
    try {
      const user = await this.authSvc.register(email.value, password.value, nombre.value, apellido.value, cedula.value, telefono.value,telefono2.value,this.fechacumple,this.image);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }else{
        if(this.authSvc.errores=="The email address is already in use by another account."){
          this.mensaje="El correo ya se encuentra usado por otro usuario.";
          this.presentAlertConfirm();
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['menu']);
    } else {
      this.router.navigate(['verificar-email']);
    }
  }

  showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }

}
