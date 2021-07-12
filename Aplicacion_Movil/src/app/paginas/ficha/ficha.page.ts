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
    fechaescuela: new Date()
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
  final = "";
  mensaje = null;

  //doc = new jsPDF();
  doc = new JSPDF("p","mm","a4");
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

  //Cargar usuario
  async cargarUsuario(){
    this.usuarioService.getEntrenador(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
     console.log(this.usuario);
    });
  }

  buscar(busquedaalumno){   
    this.Service.busquedauser(busquedaalumno.value).subscribe((alumno) =>{
      this.alumno = alumno[0];
      //this.alumno.fecha_naciento = new Date(this.alumno.fecha_naciento['seconds']*1000);
      if(this.alumno){
        this.mostrarform = "Datos"
      }else{
        this.mostrarform = "";
      }
      /*if(this.alumno.ficha == "No"){
          this.alumno = null;
          this.mensaje = "El arquero ya se encuentra registrada una ficha";
          this.mensajeingreso();
          
      }else{
          this.mostrarform = "Datos"
      }*/
      /*if(alumno.length == 1){
        var element = <HTMLInputElement> document.getElementById("formainputid");
        element.style.display = 'inline';
        var element = <HTMLInputElement> document.getElementById("formainputid2");
      element.style.display = 'inline';
      }*/
  
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
    this.final ="";
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

  generarPdf() {
    const pdfBlock = document.getElementById("print-wrapper");
    
    const options = { 
      background: "white", 
      height: pdfBlock.clientWidth, 
      width: pdfBlock.clientHeight 
    };

    domtoimage.toPng(pdfBlock, options).then((fileUrl) => {
      //var doc = new JSPDF("p","mm","a4");
      //doc.addImage(fileUrl, 'PNG', 10, 10, 240, 180);
      this.doc.addImage("../../assets/PDF/logo.jpg", "JPEG", 10, 5, 40,40)
    this.doc.addImage("../../assets/PDF/logo.jpg", "JPEG", 160, 5, 40,40)
    this.doc.addImage("../../assets/PDF/titulo.JPG", "JPEG", 80, 10, 50,30)
    this.doc.setFontSize(12)
    this.doc.setFont("helvetica", "bold");
    this.doc.text("DATOS PERSONALES DEL ALUMNO", 70, 50);
    this.doc.setFontSize(10)
    this.doc.text("Nombres:", 20, 57);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.alumno.nombre, 80, 57);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Apellidos:", 20, 63);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.alumno.apellido, 80, 63);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Número de Cédula:", 20, 69);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.alumno.cedula, 80, 69);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Fecha de Ingreso a la Esc Arq:", 20, 75);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Fecha de Nacimiento:", 20, 81);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.alumno.fecha_naciento, 80, 81);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Lugar de Nacimiento:", 20, 87);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.lugarnacimiento, 80, 87);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Dirección de domicilio:", 20, 93);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.direccion, 80, 93);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Escuela / Colegio / Universidad", 20, 99);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.institucion, 80, 99);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Donde Trabaja:", 20, 105);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.dondetrabaja, 80, 105);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Dirección de Trabajo:", 20, 111);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.direcciontrabajo, 80, 111);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Estatura:", 20, 117);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.estatura, 80, 117);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Peso:", 20, 123);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.peso, 80, 123);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Tipo de Sangre:", 20, 129);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.tiposangre, 80, 129);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Posee alergias? Cuales son?:", 20, 135);
    if(this.ficha.alergias=="Si"){
      this.doc.text("X", 85, 135);
    }else{
      this.doc.text("X", 97, 135);
    }
    this.doc.text("SI/", 80, 135);
    this.doc.text("NO/", 90, 135);
    this.doc.text("8989", 20, 141);
    this.doc.text("Fracturas? Cuales son?:", 20, 147);
    if(this.ficha.fracturas=="Si"){
      this.doc.text("X", 85, 147);
    }else{
      this.doc.text("X", 97, 147);
    }
    this.doc.text("SI/", 80, 147);
    this.doc.text("NO/", 90, 147);
    this.doc.text("8989", 20, 153);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Operaciones? Cuales son?", 20, 159);
    this.doc.text("SI/", 80, 159);
    this.doc.text("NO/", 90, 159);
    this.doc.text("8989", 20, 165);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Enfermedades? Cuales son?", 20, 171);
    this.doc.text("SI/", 80, 171);
    this.doc.text("NO/", 90, 171);
    this.doc.text("8989", 20, 177);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Toma Medicamentos? Por? / Para?", 20, 183);
    this.doc.text("SI/", 80, 183);
    this.doc.text("NO/", 90, 183);
    this.doc.text("8989", 20, 189);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("DATOS MADRE", 20, 195);
    this.doc.text("DATOS PADRE", 120, 195);
    this.doc.setFontSize(10);
    this.doc.text("Nombres:", 20, 200);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.nombmadre, 60, 200);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Apellidos:", 20, 206);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.apellmadre, 60, 206);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Numero de Cédula:", 20, 212);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.cedmadre, 60, 212);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Lugar de Trabajo:", 20, 218);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.lugartrabajomadre, 60, 218);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Email:", 20, 224);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.emailmadre, 60, 224);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Telefonos:", 20, 230);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.telefonomadre, 60, 230);
    
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Nombres:", 120, 200);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.nombpadre, 155, 200);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Apellidos:", 120, 206);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.apellpadre, 155, 206);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Numero de Cédula:", 120, 212);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.cedpadre, 155, 212);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Lugar de Trabajo:", 120, 218);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.lugartrabajopadre,155, 218);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Email:", 120, 224);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.emailpadre, 155, 224);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Telefonos:", 120, 230);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.telefonopadre, 155, 230);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Autorizo la participacion de mi hijo/a, o me hago responsable de mi participación en la Escuela de", 20, 235);
    this.doc.text("Arqueros R.Medina en todas sus actividades, renunciando expresamente a exigir responsabilidad alguna", 20, 240);
    this.doc.text("por las eventuales lesiones o accidentes que pudieran derivarse como consecuencia de la práctica", 20, 245);
    this.doc.text("ordinaria de las actividades propias de la Escuela de Arqueros. Me comprometo a respetar a los", 20, 250);
    this.doc.text("Entrenadores y a los compañeros que formen parte de la Escuela, Además a la entrega de la correcta", 20, 255);
    this.doc.text("informacíon de mi hijo/a para el conocimiento y manejo de la misma dentro de la Escuela.", 20, 260);
    this.doc.text("He leído y acepto todas las condiciones incluidas y la información entregada.", 20, 265);
    this.doc.addImage(this.firmarepresentante, "JPEG", 55, 270, 20,20)
    this.doc.addImage(this.usuario.firma, "JPEG", 135, 270, 20,20)
    this.doc.text("FIRMA DEL REPRESENTANTE:", 40, 293);
    this.doc.text("FIRMA PERSONAL AUTORIZADA:", 120, 293);
    
      let docRes = this.doc.output();
      let buffer = new ArrayBuffer(docRes.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < docRes.length; i++) {
          array[i] = docRes.charCodeAt(i);
      }


      const directory = this.file.dataDirectory;
      const fileName = "user-data.pdf";

      let options: IWriteOptions = { 
        replace: true 
      };

      this.file.checkFile(directory, fileName).then((res)=> {
        this.file.writeFile(directory, fileName,buffer, options)
        .then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File is exported'))
            .catch(e => console.log(e));
        }).catch((error)=> {
          console.log(JSON.stringify(error));
        });
      }).catch((error)=> {
        this.file.writeFile(directory,fileName,buffer).then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File exported'))
            .catch(e => console.log(e));
        })
        .catch((error)=> {
          console.log(JSON.stringify(error));
        });
      });
    }).catch(function (error) {
      console.error(error);
    });
  }
  
  /*async generarPdf(){
    this.doc.addImage("../../assets/PDF/logo.jpg", "JPEG", 10, 5, 40,40)
    this.doc.addImage("../../assets/PDF/logo.jpg", "JPEG", 160, 5, 40,40)
    this.doc.addImage("../../assets/PDF/titulo.JPG", "JPEG", 80, 10, 50,30)
    this.doc.setFontSize(12)
    this.doc.setFont("helvetica", "bold");
    this.doc.text("DATOS PERSONALES DEL ALUMNO", 70, 50);
    this.doc.setFontSize(10)
    this.doc.text("Nombres:", 20, 57);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.alumno.nombre, 80, 57);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Apellidos:", 20, 63);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.alumno.apellido, 80, 63);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Número de Cédula:", 20, 69);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.alumno.cedula, 80, 69);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Fecha de Ingreso a la Esc Arq:", 20, 75);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Fecha de Nacimiento:", 20, 81);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.alumno.fecha_naciento, 80, 81);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Lugar de Nacimiento:", 20, 87);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.lugarnacimiento, 80, 87);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Dirección de domicilio:", 20, 93);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.direccion, 80, 93);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Escuela / Colegio / Universidad", 20, 99);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.institucion, 80, 99);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Donde Trabaja:", 20, 105);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.dondetrabaja, 80, 105);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Dirección de Trabajo:", 20, 111);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.direcciontrabajo, 80, 111);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Estatura:", 20, 117);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.estatura, 80, 117);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Peso:", 20, 123);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.peso, 80, 123);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Tipo de Sangre:", 20, 129);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.tiposangre, 80, 129);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Posee alergias? Cuales son?:", 20, 135);
    if(this.ficha.alergias=="Si"){
      this.doc.text("X", 85, 135);
    }else{
      this.doc.text("X", 97, 135);
    }
    this.doc.text("SI/", 80, 135);
    this.doc.text("NO/", 90, 135);
    this.doc.text("8989", 20, 141);
    this.doc.text("Fracturas? Cuales son?:", 20, 147);
    if(this.ficha.fracturas=="Si"){
      this.doc.text("X", 85, 147);
    }else{
      this.doc.text("X", 97, 147);
    }
    this.doc.text("SI/", 80, 147);
    this.doc.text("NO/", 90, 147);
    this.doc.text("8989", 20, 153);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Operaciones? Cuales son?", 20, 159);
    this.doc.text("SI/", 80, 159);
    this.doc.text("NO/", 90, 159);
    this.doc.text("8989", 20, 165);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Enfermedades? Cuales son?", 20, 171);
    this.doc.text("SI/", 80, 171);
    this.doc.text("NO/", 90, 171);
    this.doc.text("8989", 20, 177);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Toma Medicamentos? Por? / Para?", 20, 183);
    this.doc.text("SI/", 80, 183);
    this.doc.text("NO/", 90, 183);
    this.doc.text("8989", 20, 189);
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("DATOS MADRE", 20, 195);
    this.doc.text("DATOS PADRE", 120, 195);
    this.doc.setFontSize(10);
    this.doc.text("Nombres:", 20, 200);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.nombmadre, 60, 200);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Apellidos:", 20, 206);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.apellmadre, 60, 206);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Numero de Cédula:", 20, 212);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.cedmadre, 60, 212);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Lugar de Trabajo:", 20, 218);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.lugartrabajomadre, 60, 218);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Email:", 20, 224);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.emailmadre, 60, 224);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Telefonos:", 20, 230);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.telefonomadre, 60, 230);
    
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Nombres:", 120, 200);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.nombpadre, 155, 200);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Apellidos:", 120, 206);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.apellpadre, 155, 206);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Numero de Cédula:", 120, 212);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.cedpadre, 155, 212);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Lugar de Trabajo:", 120, 218);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.lugartrabajopadre,155, 218);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Email:", 120, 224);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.emailpadre, 155, 224);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Telefonos:", 120, 230);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.ficha.telefonopadre, 155, 230);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Autorizo la participacion de mi hijo/a, o me hago responsable de mi participación en la Escuela de", 20, 235);
    this.doc.text("Arqueros R.Medina en todas sus actividades, renunciando expresamente a exigir responsabilidad alguna", 20, 240);
    this.doc.text("por las eventuales lesiones o accidentes que pudieran derivarse como consecuencia de la práctica", 20, 245);
    this.doc.text("ordinaria de las actividades propias de la Escuela de Arqueros. Me comprometo a respetar a los", 20, 250);
    this.doc.text("Entrenadores y a los compañeros que formen parte de la Escuela, Además a la entrega de la correcta", 20, 255);
    this.doc.text("informacíon de mi hijo/a para el conocimiento y manejo de la misma dentro de la Escuela.", 20, 260);
    this.doc.text("He leído y acepto todas las condiciones incluidas y la información entregada.", 20, 265);
    this.doc.addImage(this.firmarepresentante, "JPEG", 55, 270, 20,20)
    this.doc.addImage(this.usuario.firma, "JPEG", 135, 270, 20,20)
    this.doc.text("FIRMA DEL REPRESENTANTE:", 40, 293);
    this.doc.text("FIRMA PERSONAL AUTORIZADA:", 120, 293);
    this.doc.save("ficha");
    
  }*/

}
