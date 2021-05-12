import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatosUsuario } from '../../interfaces/user.interface';
import { ArqueroService} from '../../servicios/arquero.service';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {
  fechaactual = new Date();
  format = 'EEEE';
  locale = 'en-US';
  formattedDate :any;
  usuarioId= null;
  usuario: DatosUsuario={
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
    tipo:''
  }
  hora:any;
  constructor(private usuarioService: ArqueroService,) { }

  ngOnInit() {
    this.usuarioId = firebase.auth().currentUser.uid;
    if (this.usuarioId){
      this.cargarUsuario();
     
    } 
  }

  //Cargar usuario
  async cargarUsuario(){
    this.usuarioService.getArquero(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  edad(event){
    var probar=new Date(event.detail.value); 
    this.fechaactual = new Date();
    var probar4 = formatDate(this.fechaactual , "h:mm", this.locale);
    var probar3 = formatDate(probar, "h:mm", this.locale);
    this.hora = probar4;
    if("06:01">="06:00"){
      console.log("se paso");
    }else{
      console.log("todavia no");
    }
    console.log(probar4);
    this.formattedDate = formatDate(probar, this.format, this.locale);
    if(this.formattedDate=="Monday"){
     
    }else if(this.formattedDate=="Tuesday"){
     
    }else if(this.formattedDate=="Wednesday"){
      
    }else if(this.formattedDate=="Thursday"){
      
    }else if(this.formattedDate=="Friday"){
      
    }else{

    }
    
    console.log(this.formattedDate);
  }

}
