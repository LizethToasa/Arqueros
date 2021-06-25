import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DatosUsuario } from '../../interfaces/user.interface';
import { ArqueroService} from '../../servicios/arquero.service';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-ver-arquero',
  templateUrl: './ver-arquero.page.html',
  styleUrls: ['./ver-arquero.page.scss'],
})
export class VerArqueroPage implements OnInit {
  idarquero:string;
  usuario: DatosUsuario;
  mensaje:string;
  constructor(private route: ActivatedRoute, private usuarioService: ArqueroService,private nav: NavController,private alertCtrl: AlertController,) { 
    this.idarquero=this.route.snapshot.params['id'];
    this.usuarioService.getArquero(this.idarquero).subscribe(usuario => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
    
  }

  ngOnInit() {
  }

  async guardarUsuario() {
    if (this.idarquero) {
      this.usuarioService.updateArquero(this.usuario, this.idarquero).then(() => {
        this.nav.navigateForward('menu-arquero');
        this.mensaje="Se actualizó correctamente.";
        this.mensajecorrecto();
      });
    } 
  }
  async mensajecorrecto() {
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

}
