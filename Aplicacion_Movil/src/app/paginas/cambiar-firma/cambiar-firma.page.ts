import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import * as firebase from 'firebase';
import { EntrenadorService} from '../../servicios/entrenador.service';
import { DatosEntrenador } from '../../interfaces/entrenador.interface';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-cambiar-firma',
  templateUrl: './cambiar-firma.page.html',
  styleUrls: ['./cambiar-firma.page.scss'],
})
export class CambiarFirmaPage implements OnInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  usuario: DatosEntrenador={
    uid: '',
    correo: '',
    nombres: '',
    apellidos: '',
    cedula: '',
    telefono: '',
    estado:'',
    foto:'',
    tipo:'',
    firma:''
  }
  mensaje:string;
  usuarioId= null;
  firma:string=null;
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 300,
    'canvasHeight': 300
  };

  constructor(private usuarioService: EntrenadorService,private nav: NavController, private alertCtrl: AlertController) {

  }
  ngOnInit() {
    this.usuarioId = firebase.auth().currentUser.uid;
    console.log(this.usuarioId);
    if (this.usuarioId){
      this.cargarUsuario();
     
    } 

  }

  async cargarUsuario(){
    this.usuarioService.getEntrenador(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
      console.log(usuario);
    });
  }

  async guardarUsuario() {
    this.usuario.firma =  this.firma;
    if (this.usuarioId) {
      this.usuarioService.updateEntrenador(this.usuario, this.usuarioId).then(() => {
        this.nav.navigateForward('menu-entrenador');
        this.mensaje="Se actualizó correctamente su firma.";
        this.mensajeconfirmacion();
      });
    } 
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

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    this.firma = this.signaturePad.toDataURL();
    console.log(this.signaturePad.toDataURL());

  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
    
  }
  borrarfirma(){
    this.firma=null
    this.signaturePad.clear(); 
  }
  
 

}
