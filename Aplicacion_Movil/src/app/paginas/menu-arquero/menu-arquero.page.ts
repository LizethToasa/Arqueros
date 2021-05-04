import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-menu-arquero',
  templateUrl: './menu-arquero.page.html',
  styleUrls: ['./menu-arquero.page.scss'],
})
export class MenuArqueroPage implements OnInit {

  constructor(
    private authservice : AuthService,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {
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
