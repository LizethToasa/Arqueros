import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { EntrenadorService} from '../../servicios/entrenador.service';

@Component({
  selector: 'app-menu-entrenador',
  templateUrl: './menu-entrenador.page.html',
  styleUrls: ['./menu-entrenador.page.scss'],
})
export class MenuEntrenadorPage implements OnInit {
  menu1:boolean;
  menu2:boolean;
  menu3:boolean;
  menu4:boolean;
  menu5:boolean;
  menu6:boolean;
  menu7:boolean;
  usuarioId= null;
  constructor(
    private authservice : AuthService,
    private alertCtrl: AlertController,
    private platform: Platform,
    private usuarioService: EntrenadorService,
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.mensajesalir();
    });
    this.usuarioId = firebase.auth().currentUser.uid;
    this.usuarioService.getEntrenador(this.usuarioId).subscribe(usuario => {
      if(usuario.firma == "" || usuario.firma.length == 0){
        this.menu1=true;
        this.menu2=true;
        this.menu3=true;
        this.menu4=true;
        this.menu5=true;
        this.menu6=true;
        this.menu7=true;
        this.mensajefaltafirma();
      }else{
        this.menu1=false;
        this.menu2=false;
        this.menu3=false;
        this.menu4=false;
        this.menu5=false;
        this.menu6=false;
        this.menu7=false;
      }
    });
   }

  ngOnInit() {
  }

  async mensajefaltafirma() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'Ir al perfil a ingresar la firma y desbloquear todos los modulos.',
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

  async mensajesalir() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: '¿Seguro de cerrar sesión?',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.salir();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log();
          }
        }
      ]
    });
    await alert.present();
  }

  salir(){ 
    this.authservice.logout();
  }



}
