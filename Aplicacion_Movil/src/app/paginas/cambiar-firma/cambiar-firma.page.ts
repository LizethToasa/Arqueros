import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import * as firebase from 'firebase';
import { EntrenadorService} from '../../servicios/entrenador.service';
import { DatosEntrenador } from '../../interfaces/entrenador.interface';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { Observable, Observer } from "rxjs";

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
  public image: any;
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 300,
    'canvasHeight': 300
  };

  constructor(private usuarioService: EntrenadorService,private nav: NavController, private alertCtrl: AlertController) {

  }
  ngOnInit() {
    this.usuarioId = firebase.auth().currentUser.uid;

    if (this.usuarioId){
      this.cargarUsuario();
     
    } 

  }

  async cargarUsuario(){
    this.usuarioService.getEntrenador(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
    
    });
  }

  async guardarUsuario() {
    var blob = this.dataURItoBlob(this.firma);
    var imagen_firma = new File([blob], 'imagen_firma.jpg', { type: 'image/jpg' });
    this.usuarioService.updateFirma(this.usuario,this.usuarioId,imagen_firma);
    this.nav.navigateForward('menu-entrenador');
    this.mensaje="Se actualizó correctamente su firma.";
    this.mensajeconfirmacion();
    /*this.image=this.firma;
    /*this.usuario.firma =  this.firma;
    if (this.usuarioId) {
      this.usuarioService.updateEntrenador(this.usuario, this.usuarioId).then(() => {
        this.nav.navigateForward('menu-entrenador');
        this.mensaje="Se actualizó correctamente su firma.";
        this.mensajeconfirmacion();
      });
    }*/ 
  }
  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }
  /*dataURItoBlob(dataURI: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: "image/jpeg" });
      observer.next(blob);
      observer.complete();
    });
  }*/


  

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
