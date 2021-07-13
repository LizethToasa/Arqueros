import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from '../../interfaces/user.interface';
import { Ficha } from '../../interfaces/ficha.interface';
import { ArqueroService} from '../../servicios/arquero.service';
import { EntrenadorService} from '../../servicios/entrenador.service'; 
import { formatDate } from "@angular/common";

import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-listado-arqueros',
  templateUrl: './listado-arqueros.page.html',
  styleUrls: ['./listado-arqueros.page.scss'],
})
export class ListadoArquerosPage implements OnInit {
  format = 'EEEE';
  locale = 'en-US';
  ficha:Ficha;
  arquero: DatosUsuario;
  arqueros: DatosUsuario[];
  pageActual: number= 1;
  valida="No";
  doc = new JSPDF("p","mm","a4");
  constructor(private usuarioService: ArqueroService,private Service: EntrenadorService,private file: File,private fileOpener: FileOpener) {
    this.usuarioService.getArqueros().subscribe(usuario => {
      this.arqueros = usuario;
    });
   }

  ngOnInit() {
  }
  busqueda(busquedanombre){
    this.usuarioService.busquedauser2(busquedanombre.value).subscribe(usuario => {
      this.arqueros = usuario;
    });
  }

  descargar(id:string){
    this.usuarioService.busquedauser(id).subscribe((alumno) =>{
      this.arquero = alumno[0];
      this.Service.getFicha(this.arquero.uid).subscribe((ficha) =>{
        this.ficha = ficha[0];
        const pdfBlock = document.getElementById("print-wrapper");
    
        const options = { 
          background: "white", 
          height: pdfBlock.clientWidth, 
          width: pdfBlock.clientHeight 
        };
        var hola = new Date(this.ficha.fechaescuela['seconds']*1000);
        var fech = formatDate(new Date(hola) , "dd/MM/yyyy", this.locale);
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
        this.doc.text(this.arquero.nombre, 80, 57);
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Apellidos:", 20, 63);
        this.doc.setFont("helvetica", "normal");
        this.doc.text(this.arquero.apellido, 80, 63);
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Número de Cédula:", 20, 69);
        this.doc.setFont("helvetica", "normal");
        this.doc.text(this.arquero.cedula, 80, 69);
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Fecha de Ingreso a la Esc Arq:", 20, 75);
        this.doc.setFont("helvetica", "normal");
        this.doc.text(fech, 80, 75);
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Fecha de Nacimiento:", 20, 81);
        this.doc.setFont("helvetica", "normal");
        this.doc.text(this.arquero.fecha_naciento, 80, 81);
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
        this.doc.text(this.ficha.descripcionalergias, 20, 141);
        this.doc.text("Fracturas? Cuales son?:", 20, 147);
        if(this.ficha.fracturas=="Si"){
          this.doc.text("X", 85, 147);
        }else{
          this.doc.text("X", 97, 147);
        }
        this.doc.text("SI/", 80, 147);
        this.doc.text("NO/", 90, 147);
        this.doc.text(this.ficha.descripcionfracturas, 20, 153);
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Operaciones? Cuales son?", 20, 159);
        if(this.ficha.operaciones=="Si"){
          this.doc.text("X", 85, 159);
        }else{
          this.doc.text("X", 97, 159);
        }
        this.doc.text("SI/", 80, 159);
        this.doc.text("NO/", 90, 159);
        this.doc.text(this.ficha.descripcionoperaciones, 20, 165);
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Enfermedades? Cuales son?", 20, 171);
        if(this.ficha.enfermedades=="Si"){
          this.doc.text("X", 85, 171);
        }else{
          this.doc.text("X", 97, 171);
        }
        this.doc.text("SI/", 80, 171);
        this.doc.text("NO/", 90, 171);
        this.doc.text(this.ficha.descripcionenfermades, 20, 177);
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Toma Medicamentos? Por? / Para?", 20, 183);
        if(this.ficha.medicamentos=="Si"){
          this.doc.text("X", 85, 183);
        }else{
          this.doc.text("X", 97, 183);
        }
        this.doc.text("SI/", 80, 183);
        this.doc.text("NO/", 90, 183);
        this.doc.text(this.ficha.descripcionmedicamentos, 20, 189);
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
        this.doc.addImage(this.ficha.firma, "JPEG", 55, 270, 20,20)
        this.doc.addImage(this.ficha.firmaentrenador, "JPEG", 135, 270, 20,20)
        this.doc.text("FIRMA DEL REPRESENTANTE:", 40, 293);
        this.doc.text("FIRMA PERSONAL AUTORIZADA:", 120, 293);
        this.doc.save("ficha");
        
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
      })
    })
  }

}
