import { Component, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import { SignaturePad } from 'angular2-signaturepad';
import { DatosUsuario } from '../../interfaces/user.interface';
import { Ficha } from '../../interfaces/ficha.interface';
import { ArqueroService } from '../../servicios/arquero.service';
import { formatDate } from "@angular/common";
import { Router } from '@angular/router';
import { EntrenadorService} from '../../servicios/entrenador.service';
import * as firebase from 'firebase';
import { DatosEntrenador } from '../../interfaces/entrenador.interface';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {
  format = 'EEEE';
  locale = 'en-US';
  alumno: DatosUsuario={
    uid: '',
    correo: '',
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    telefono2: '',
    estado:'',
    foto:'',
    fecha_naciento:'',
    tipo:'',
    ficha:''
  }
  usuario: DatosEntrenador;


  ficha: Ficha={
    idarquero:'',
    lugarnacimiento:'',
    direccion:'',
    institucion:'',
    dondetrabaja:'',
    direcciontrabajo:'',
    estatura:'',
    peso:'',
    tiposangre:'',
    alergias:'',
    descripcionalergias:'',
    fracturas:'',
    descripcionfracturas:'',
    operaciones:'',
    descripcionoperaciones:'',
    enfermedades:'',
    descripcionenfermades:'',
    medicamentos:'',
	  descripcionmedicamentos:'',
    nombpadre:'',
    apellpadre:'',
    cedpadre:'',
    lugartrabajopadre:'',
    emailpadre:'',
    telefonopadre:'',
    nombmadre:'',
    apellmadre:'',
    cedmadre:'',
    lugartrabajomadre:'',
    emailmadre:'',
    telefonomadre:'',
    telefonemergencia:'',
    firma:'',
    identrenador:'',
    fechaescuela: new Date(),
    firmaentrenador:''
  }

  age:any;
  usuarioId= null;
  fechaactual: Date = new Date();
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  firmarepresentante:any;
  mostrarform="";
  
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 300,
    'canvasHeight': 300
  };
  final = null;
  mensaje = null;

  formGroup: FormGroup; 
  formGroup2: FormGroup; 
  constructor(private nav: NavController,public formBuilder: FormBuilder,private Service: ArqueroService,private usuarioService: EntrenadorService,private file: File,
    private fileOpener: FileOpener,private alertCtrl: AlertController) {
    this.usuarioId = firebase.auth().currentUser.uid;
    if (this.usuarioId){
      this.cargarUsuario();
    } 
    this.crearvalidaciones();
    this.crearvalidaciones2();
  }

  ngOnInit() {
  }

  //Crear validaciones para el form 
  crearvalidaciones(){
    const cedula = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));

    this.formGroup = this.formBuilder.group({cedula});
  }

  crearvalidaciones2(){
    const fechadev = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const lugarnacimiento = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$")
    ]));
    const direcciondomi = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]));
    const institucion = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$")
    ]));
    const dondetrabaja = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      
    ]));
    const direcciontrabajo = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(50),
    ]));
    const estatur = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]));
    const pes = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]));
    const tipsang = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]));
    const posale = new FormControl('', Validators.compose([
      Validators.required,
      
    ]));
    const desposale = new FormControl('', Validators.compose([
      Validators.maxLength(50),
    ]));
    const fractcua = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const desfractcua = new FormControl('', Validators.compose([
      Validators.maxLength(50),
    ]));
    const operacion = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const desoperacion = new FormControl('', Validators.compose([
      Validators.maxLength(50),
    ]));
    const enferm = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const desenfer = new FormControl('', Validators.compose([
      Validators.maxLength(50),
    ]));
    const tommedo = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const destommedo = new FormControl('', Validators.compose([
      Validators.maxLength(50),
    ]));
    const nombrepadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$"),
    ]));
    const apellidopadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$"),
    ]));
    const cedulapadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));
    const lugarpadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]));
    const emailpadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
      Validators.minLength(10),
      Validators.maxLength(40)
    ]));
    const telefonopadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30)
    ]));
    const nombremadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$"),
    ]));
    const apellidosmadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$"),
    ]));
    const numerocedulamadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));
    const lugarmadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]));
    const emailmadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
      Validators.minLength(10),
      Validators.maxLength(40)
    ]));
    const telefonomadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30)
    ]));
    const telemerge = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30)
    ]));

    this.formGroup2 = this.formBuilder.group({
      fechadev,lugarnacimiento,direcciondomi,institucion,dondetrabaja,direcciontrabajo,estatur,pes,tipsang,
      posale,desposale,fractcua,desfractcua,operacion,desoperacion,enferm,desenfer,tommedo,destommedo,
      nombrepadre,apellidopadre,cedulapadre,lugarpadre,emailpadre,telefonopadre,
      nombremadre,apellidosmadre,numerocedulamadre,lugarmadre,emailmadre,telefonomadre,telemerge

    });
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

  cambiofecha2(event){
  
    var fech = formatDate(new Date(event.detail.value) , "dd/MM/yyyy", this.locale);
    this.ficha.fechaescuela = new Date(event.detail.value);

  }

  async cargarUsuario(){
    this.usuarioService.getEntrenador(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  buscar(busquedaalumno){   
    this.Service.busquedauser(busquedaalumno.value).subscribe((alumno) =>{
      this.alumno = alumno[0];
      if(this.alumno){
        this.mostrarform = "Datos"
      }else{
        this.mostrarform = "";
      }
  
    })
  }

  edad(event){
    var probar4 = formatDate(new Date(this.age) , "MM/dd/yyyy", this.locale);


   
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  borrarfirma(){
    this.ficha.firma = "";
    this.signaturePad.clear(); 
    this.final =null;
    this.ficha.firma = null;
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    this.firmarepresentante=this.signaturePad.toDataURL();
    this.ficha.firma = this.firmarepresentante;
    this.final ="Firma";
  
    
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  drawStart2() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  async getDataUri(url): Promise<HTMLImageElement> {
    return new Promise(resolve => {
      var image = new Image();

      image.onload = () => {
        resolve(image);
      };

      image.src = url;
    })
 }

 async habilitarfirverif(){
  if(this.alumno.ficha == "No"){
    this.mensaje = "El arquero ya se encuentra registrada una ficha.";
    this.mensajeingreso();
    
  }else{
    var element = <HTMLInputElement> document.getElementById("formainputid");
    element.style.display = 'inline';
    var element = <HTMLInputElement> document.getElementById("formainputid2");
    element.style.display = 'inline';
  }
  
 }


 async guardarficha(){
   this.ficha.idarquero = this.alumno.uid;
   this.ficha.identrenador = this.usuario.uid;
   this.ficha.firmaentrenador = this.usuario.firma;
   this.alumno.ficha = "No";
   this.alumno.estado = "Activo";

   
   
    this.usuarioService.addFicha(this.ficha).then(() => {
      this.Service.updateArquero(this.alumno, this.alumno.uid).then(() => {
        this.nav.navigateForward('menu-arquero');
        this.mensaje="Se registro correctamente la ficha.";
        this.mensajeingreso();
      });
     });
 }

seleccionalergias(){
   var element = <HTMLInputElement> document.getElementById("aler");
    if(this.ficha.alergias=="Si"){
      element.style.display = 'inline';
    }else{
      this.ficha.descripcionalergias = "";
      element.style.display = 'none';
    }
 }
seleccionafracturas(){
  var element = <HTMLInputElement> document.getElementById("frac");
   if(this.ficha.fracturas=="Si"){
     element.style.display = 'inline';
   }else{
    this.ficha.descripcionfracturas = "";
     element.style.display = 'none';
   }
}
seleccionaoperaciones(){
  var element = <HTMLInputElement> document.getElementById("opera");
   if(this.ficha.operaciones=="Si"){
     element.style.display = 'inline';
   }else{
    this.ficha.descripcionoperaciones = "";
     element.style.display = 'none';
   }
}
seleccionaenfermedades(){
  var element = <HTMLInputElement> document.getElementById("enfer");
   if(this.ficha.enfermedades=="Si"){
     element.style.display = 'inline';
   }else{
    this.ficha.descripcionenfermades = "";
     element.style.display = 'none';
   }
}

seleccionamedicamentos(){
  var element = <HTMLInputElement> document.getElementById("medi");
   if(this.ficha.medicamentos=="Si"){
     element.style.display = 'inline';
   }else{
    this.ficha.descripcionmedicamentos = "";
     element.style.display = 'none';
   }
}

}
