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

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {
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
    identrenador:''
  }

  age:any;
  format = 'EEEE';
  locale = 'en-US';
  usuarioId= null;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  firmarepresentante:any;
  
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 300,
    'canvasHeight': 300
  };

  doc = new jsPDF();
  constructor(private Service: ArqueroService,private usuarioService: EntrenadorService,) {
    this.usuarioId = firebase.auth().currentUser.uid;
    if (this.usuarioId){
      this.cargarUsuario();
     
    } 
  }

  ngOnInit() {
  }

  //Cargar usuario
  async cargarUsuario(){
    this.usuarioService.getEntrenador(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
     console.log(this.usuario);
    });
  }

  buscar(busquedatienda){   
    this.Service.busquedauser(busquedatienda.value).subscribe((alumno) =>{
      this.alumno = alumno[0];
      //this.alumno.fecha_naciento = new Date(this.alumno.fecha_naciento['seconds']*1000);
   
      if(alumno){
        var element = <HTMLInputElement> document.getElementById("formainputid");
        element.style.display = 'inline';
        var element = <HTMLInputElement> document.getElementById("formainputid2");
      element.style.display = 'inline';
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
    this.signaturePad.clear(); 
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    this.firmarepresentante=this.signaturePad.toDataURL();
    this.ficha.firma = this.firmarepresentante
  
    
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

seleccionalergias(){
   var element = <HTMLInputElement> document.getElementById("aler");
    if(this.ficha.alergias=="Si"){
      element.style.display = 'inline';
    }else{
      element.style.display = 'none';
    }
 }
seleccionafracturas(){
  var element = <HTMLInputElement> document.getElementById("frac");
   if(this.ficha.fracturas=="Si"){
     element.style.display = 'inline';
   }else{
     element.style.display = 'none';
   }
}
seleccionaoperaciones(){
  var element = <HTMLInputElement> document.getElementById("opera");
   if(this.ficha.operaciones=="Si"){
     element.style.display = 'inline';
   }else{
     element.style.display = 'none';
   }
}
seleccionaenfermedades(){
  var element = <HTMLInputElement> document.getElementById("enfer");
   if(this.ficha.enfermedades=="Si"){
     element.style.display = 'inline';
   }else{
     element.style.display = 'none';
   }
}

seleccionamedicamentos(){
  var element = <HTMLInputElement> document.getElementById("medi");
   if(this.ficha.medicamentos=="Si"){
     element.style.display = 'inline';
   }else{
     element.style.display = 'none';
   }
}
  
  async generarPdf(){
    this.doc.addImage("../../assets/PDF/logo.jpg", "JPEG", 10, 5, 40,40)
    this.doc.addImage("../../assets/PDF/logo.jpg", "JPEG", 160, 5, 40,40)
    this.doc.addImage("../../assets/PDF/titulo.JPG", "JPEG", 80, 10, 50,30)
    this.doc.setFontSize(12)
    this.doc.setFont("helvetica", "bold");
    this.doc.text("DATOS PERSONALES DEL ALUMNO", 70, 50);
    this.doc.setFontSize(10)
    this.doc.text("Nombres:", 20, 57);
    this.doc.text(this.alumno.nombre, 80, 57);
    this.doc.text("Apellidos:", 20, 63);
    this.doc.text(this.alumno.apellido, 80, 63);
    this.doc.text("Número de Cédula:", 20, 69);
    this.doc.text(this.alumno.cedula, 80, 69);
    this.doc.text("Fecha de Ingreso a la Esc Arq:", 20, 75);
    this.doc.text("Fecha de Nacimiento:", 20, 81);
    this.doc.text(this.alumno.fecha_naciento, 80, 81);
    this.doc.text("Lugar de Nacimiento:", 20, 87);
    this.doc.text(this.ficha.lugarnacimiento, 80, 87);
    this.doc.text("Dirección de domicilio:", 20, 93);
    this.doc.text(this.ficha.direccion, 80, 93);
    this.doc.text("Escuela / Colegio / Universidad", 20, 99);
    this.doc.text(this.ficha.institucion, 80, 99);
    this.doc.text("Donde Trabaja:", 20, 105);
    this.doc.text(this.ficha.dondetrabaja, 80, 105);
    this.doc.text("Dirección de Trabajo:", 20, 111);
    this.doc.text(this.ficha.direcciontrabajo, 80, 111);
    this.doc.text("Estatura:", 20, 117);
    this.doc.text(this.ficha.estatura, 80, 117);
    this.doc.text("Peso:", 20, 123);
    this.doc.text(this.ficha.peso, 80, 123);
    this.doc.text("Tipo de Sangre:", 20, 129);
    this.doc.text(this.ficha.tiposangre, 80, 129);
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
    this.doc.text("Operaciones? Cuales son?", 20, 159);
    this.doc.text("SI/", 80, 159);
    this.doc.text("NO/", 90, 159);
    this.doc.text("8989", 20, 165);
    this.doc.text("Enfermedades? Cuales son?", 20, 171);
    this.doc.text("SI/", 80, 171);
    this.doc.text("NO/", 90, 171);
    this.doc.text("8989", 20, 177);
    this.doc.text("Toma Medicamentos? Por? / Para?", 20, 183);
    this.doc.text("SI/", 80, 183);
    this.doc.text("NO/", 90, 183);
    this.doc.text("8989", 20, 189);
    this.doc.setFontSize(12);
    this.doc.text("DATOS MADRE", 20, 195);
    this.doc.text("DATOS PADRE", 120, 195);
    this.doc.setFontSize(10);
    this.doc.text("Nombres:", 20, 200);
    this.doc.text(this.ficha.nombpadre, 50, 200);
    this.doc.text("Apellidos:", 20, 206);
    this.doc.text(this.ficha.apellpadre, 80, 206);
    this.doc.text("Numero de Cédula:", 20, 212);
    this.doc.text(this.ficha.cedpadre, 50, 212);
    this.doc.text("Lugar de Trabajo:", 20, 218);
    this.doc.text(this.ficha.lugartrabajopadre, 50, 218);
    this.doc.text("Email:", 20, 224);
    this.doc.text(this.ficha.emailpadre, 50, 224);
    this.doc.text("Telefonos:", 20, 230);
    this.doc.text(this.ficha.telefonopadre, 50, 230);
    

    this.doc.text("Nombres:", 120, 200);
    this.doc.text(this.ficha.nombpadre, 170, 200);
    this.doc.text("Apellidos:", 120, 206);
    this.doc.text(this.ficha.nombpadre, 170, 206);
    this.doc.text("Numero de Cédula:", 120, 212);
    this.doc.text(this.ficha.nombpadre, 170, 212);
    this.doc.text("Lugar de Trabajo:", 120, 218);
    this.doc.text(this.ficha.nombpadre,170, 218);
    this.doc.text("Email:", 120, 224);
    this.doc.text(this.ficha.nombpadre, 170, 224);
    this.doc.text("Telefonos:", 120, 230);
    this.doc.text(this.ficha.nombpadre, 170, 230);

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
    this.doc.output();
    
  }

}
