import { Component, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import { SignaturePad } from 'angular2-signaturepad';
import { DatosUsuario } from '../../interfaces/user.interface';
import { Ficha } from '../../interfaces/ficha.interface';
import { ArqueroService } from '../../servicios/arquero.service';
import { formatDate } from "@angular/common";
import { ignoreElements } from 'rxjs/operators';

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
  }

  age:any;
  format = 'EEEE';
  locale = 'en-US';
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  firmarepresentante:any;
  
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 300,
    'canvasHeight': 300
  };

  doc = new jsPDF();
  constructor(private Service: ArqueroService) {
  
  }

  ngOnInit() {
  }

  buscar(busquedatienda){   
    this.Service.busquedauser(busquedatienda.value).subscribe((alumno) =>{
      this.alumno = alumno[0];
      //this.alumno.fecha_naciento = new Date(this.alumno.fecha_naciento['seconds']*1000);
      console.log(this.alumno.nombre);
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
    console.log(probar4.toString());

   
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
    console.log(this.signaturePad.toDataURL());
    
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
  
  async generarPdf(){
    this.doc.addImage("../../assets/PDF/logo.jpg", "JPEG", 10, 5, 40,40)
    this.doc.addImage("../../assets/PDF/logo.jpg", "JPEG", 160, 5, 40,40)
    this.doc.addImage("../../assets/PDF/titulo.JPG", "JPEG", 80, 10, 50,30)
    this.doc.setFontSize(12)
    this.doc.setFont("helvetica", "bold");
    this.doc.text("DATOS PERSONALES DEL ALUMNO", 70, 50);
    this.doc.setFontSize(10)
    this.doc.text("Nombres:", 20, 60);
    this.doc.text(this.alumno.nombre, 80, 60);
    this.doc.text("Apellidos:", 20, 67);
    this.doc.text(this.alumno.apellido, 80, 67);
    this.doc.text("Número de Cédula:", 20, 74);
    this.doc.text(this.alumno.cedula, 80, 74);
    this.doc.text("Fecha de Ingreso a la Esc Arq:", 20, 81);
    this.doc.text("Fecha de Nacimiento:", 20, 88);
    this.doc.text(this.alumno.fecha_naciento, 80, 88);
    this.doc.text("Lugar de Nacimiento:", 20, 95);
    this.doc.text(this.ficha.lugarnacimiento, 80, 95);
    this.doc.text("Dirección de domicilio:", 20, 102);
    this.doc.text(this.ficha.direccion, 80, 102);
    this.doc.text("Escuela / Colegio / Universidad", 20, 109);
    this.doc.text(this.ficha.institucion, 80, 109);
    this.doc.text("Donde Trabaja:", 20, 116);
    this.doc.text(this.ficha.dondetrabaja, 80, 116);
    this.doc.text("Dirección de Trabajo:", 20, 123);
    this.doc.text(this.ficha.direcciontrabajo, 80, 123);
    this.doc.text("Estatura:", 20, 130);
    this.doc.text(this.ficha.estatura, 80, 130);
    this.doc.text("Peso:", 20, 137);
    this.doc.text(this.ficha.peso, 80, 137);
    this.doc.text("Tipo de Sangre:", 20, 144);
    this.doc.text(this.ficha.tiposangre, 80, 144);
    this.doc.text("Posee alergias? Cuales son?:", 20, 151);
    if(this.ficha.alergias=="Si"){
      this.doc.text("X", 85, 151);
    }else{
      this.doc.text("X", 95, 151);
    }
    this.doc.text("SI/", 80, 151);
    this.doc.text("NO/", 90, 151);
    this.doc.text("Fracturas? Cuales son?:", 20, 158);
    if(this.ficha.fracturas=="Si"){
      this.doc.text("X", 85, 158);
    }else{
      this.doc.text("X", 95, 158);
    }
    this.doc.text("SI/", 80, 158);
    this.doc.text("NO/", 90, 158);
    this.doc.text("Toma Medicamentos? Por? / Para?", 20, 165);
    this.doc.text("SI/", 80, 165);
    this.doc.text("NO/", 90, 165);
    this.doc.setFontSize(12);
    this.doc.text("DATOS MADRE", 20, 175);
    this.doc.text("DATOS PADRE", 120, 175);
    this.doc.setFontSize(10);
    this.doc.text("Nombres:", 20, 182);
    this.doc.text(this.ficha.nombpadre, 50, 182);
    this.doc.text("Apellidos:", 20, 189);
    this.doc.text(this.ficha.apellpadre, 80, 189);
    this.doc.text("Numero de Cédula:", 50, 196);
    this.doc.text(this.ficha.cedpadre, 50, 196);
    this.doc.text("Lugar de Trabajo:", 20, 203);
    this.doc.text(this.ficha.lugartrabajopadre, 50, 203);
    this.doc.text("Email:", 20, 210);
    this.doc.text(this.ficha.emailpadre, 50, 210);
    this.doc.text("Telefonos:", 20, 217);
    this.doc.text(this.ficha.telefonopadre, 50, 217);
    

    this.doc.text("Nombres:", 120, 182);
    this.doc.text(this.ficha.nombpadre, 170, 182);
    this.doc.text("Apellidos:", 120, 189);
    this.doc.text(this.ficha.nombpadre, 170, 189);
    this.doc.text("Numero de Cédula:", 120, 196);
    this.doc.text(this.ficha.nombpadre, 170, 196);
    this.doc.text("Lugar de Trabajo:", 120, 203);
    this.doc.text(this.ficha.nombpadre,170, 203);
    this.doc.text("Email:", 170, 210);
    this.doc.text(this.ficha.nombpadre, 170, 210);
    this.doc.text("Telefonos:", 120, 217);
    this.doc.text(this.ficha.nombpadre, 170, 217);

    this.doc.text("Autorizo la participacion de mi hijo/a, o me hago responsable de mi participación en la Escuela de", 20, 224);
    this.doc.text("Arqueros R.Medina en todas sus actividades, renunciando expresamente a exigir responsabilidad alguna", 20, 231);
    this.doc.text("por las eventuales lesiones o accidentes que pudieran derivarse como consecuencia de la práctica", 20, 238);
    this.doc.text("ordinaria de las actividades propias de la Escuela de Arqueros. Me comprometo a respetar a los", 20, 245);
    this.doc.text("Entrenadores y a los compañeros que formen parte de la Escuela, Además a la entrega de la correcta", 20, 252);
    this.doc.text("informacíon de mi hijo/a para el conocimiento y manejo de la misma dentro de la Escuela.", 20, 259);
    this.doc.text("He leído y acepto todas las condiciones incluidas y la información entregada.", 20, 266);
    this.doc.addImage(this.firmarepresentante, "JPEG", 55, 267, 20,20)
    this.doc.text("FIRMA DEL REPRESENTANTE:", 40, 290);
    this.doc.text("FIRMA PERSONAL AUTORIZADA:", 120, 290);
    this.doc.save("Ficha.pdf");
  }

}
