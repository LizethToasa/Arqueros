import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from '../../interfaces/user.interface';
import { Avance } from '../../interfaces/avance.interface';
import { ArqueroService} from '../../servicios/arquero.service';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { formatDate } from "@angular/common";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-avance',
  templateUrl: './avance.page.html',
  styleUrls: ['./avance.page.scss'],
})
export class AvancePage implements OnInit {
  idarquero:string;
  usuario: DatosUsuario;
  usuarioId= null;
  format = 'EEEE';
  locale = 'en-US';
  fechaactual = formatDate(new Date() , "dd/MM/yyyy", this.locale);
  avance: Avance={
    identrenador: '',
    idarquero: '',
    mensaje: '',
    fecha:'',
    fecha2: new Date()
  }
  formGroup: FormGroup;
  mensaje=null;
  constructor(public formBuilder: FormBuilder,private route: ActivatedRoute, private usuarioService: ArqueroService,private nav: NavController,private alertCtrl: AlertController,private entreadorservice: EntrenadorService) {
    this.idarquero=this.route.snapshot.params['id'];
    this.avance.idarquero= this.idarquero;
    this.usuarioId = firebase.auth().currentUser.uid;
    this.avance.identrenador = this.usuarioId;
    this.avance.fecha = this.fechaactual;
    this.usuarioService.getArquero(this.idarquero).subscribe(usuario => {
      this.usuario = usuario;
  
    });
    this.crearvalidaciones();
   }

  ngOnInit() {
  }

  crearvalidaciones(){
    const mensaje = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]));
 
    
    this.formGroup = this.formBuilder.group({mensaje});
  }

  async mensajeingreso() {
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

  async guardarAvance(){
    this.entreadorservice.addAvance(this.avance).then(() => {
      this.nav.navigateForward('listado-avance'); 
      this.mensaje="Se envió correctamente el avance.";
      this.mensajeingreso();
    });
  }

}
