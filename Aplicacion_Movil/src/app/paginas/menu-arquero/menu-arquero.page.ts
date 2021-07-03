import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { ArqueroService } from '../../servicios/arquero.service';
@Component({
  selector: 'app-menu-arquero',
  templateUrl: './menu-arquero.page.html',
  styleUrls: ['./menu-arquero.page.scss'],
})
export class MenuArqueroPage implements OnInit {
  usuarioId= null;
  constructor(
    private authservice : AuthService,
    private alertCtrl: AlertController,
    private platform: Platform,
    private usuarioService: ArqueroService
  ) {
    this.usuarioId = firebase.auth().currentUser.uid;
    this.usuarioService.getArquero(this.usuarioId).subscribe(usuario => {
      if(usuario.estado == "Inactivo"){
        this.authservice.logout();
      }

    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.mensajesalir();
    });
   }

  ngOnInit() {
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
