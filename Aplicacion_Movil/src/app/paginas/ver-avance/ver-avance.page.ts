import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from '../../interfaces/user.interface';
import { ArqueroService} from '../../servicios/arquero.service';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { Avance } from '../../interfaces/avance.interface';
import { ActivatedRoute} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-ver-avance',
  templateUrl: './ver-avance.page.html',
  styleUrls: ['./ver-avance.page.scss'],
})
export class VerAvancePage implements OnInit {
  idavance:string;
  avance: Avance;
  arquero: DatosUsuario;
  formGroup: FormGroup;
  constructor(public formBuilder: FormBuilder,private AvanceService: EntrenadorService,private usuarioService: ArqueroService,private route: ActivatedRoute,private alertCtrl: AlertController,
    private nav: NavController) { 
    this.idavance=this.route.snapshot.params['id'];
    this.AvanceService.getAvance(this.idavance).subscribe((avance) =>{
      this.avance = avance;
      this.usuarioService.getArquero(this.avance.idarquero).subscribe((arquero) =>{
        this.arquero = arquero;
   
      })
    })
    this.crearvalidaciones();
  }

  ngOnInit() {
  }

  crearvalidaciones(){
    const mensaje = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]));
 
    
    this.formGroup = this.formBuilder.group({mensaje});
  }

  async eliminaravance() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: "¿Esta seguro de eliminar el avance?",
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.avanceeliminar();
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

  async mensajes() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: "Se actualizo correctamente el avance.",
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

  async avanceeliminar(){
    this.AvanceService.removeAvance(this.idavance);
    this.nav.navigateForward('/menu-entrenador');

  }
  async actualizar(){
    this.AvanceService.updateAvance(this.avance, this.idavance).then(() => {
      this.mensajes();
      this.nav.navigateForward('/menu-entrenador');
    });

  }

}
