import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { Horario } from '../../interfaces/horario.interface';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-ver-horario',
  templateUrl: './ver-horario.page.html',
  styleUrls: ['./ver-horario.page.scss'],
})
export class VerHorarioPage implements OnInit {
  idhorario:string;
  horario:  Horario;
  entrada:Date;
  salida:Date;
  mensaje:any;
  constructor(private route: ActivatedRoute, private entrenadorservice: EntrenadorService,private nav: NavController,private alertCtrl: AlertController) {
    this.idhorario=this.route.snapshot.params['id'];
    this.entrenadorservice.getHoario(this.idhorario).subscribe(horario => {
      this.horario = horario;
      this.entrada = new Date("December 17, 1995 "+ this.horario.horaentrada+":00");
      this.salida = new Date("December 17, 1995 "+ this.horario.horasalida+":00");

    });
   }

  ngOnInit() {
  }

  horaentrada(event){
    var horas = new Date(event.detail.value).getHours().toString();
    if(horas=="6"||horas=="7"||horas=="8"||horas=="9"){
      horas="0"+horas;
    }
    var minutos= new Date(event.detail.value).getMinutes().toString();
    if(minutos=="1"||minutos=="2"||minutos=="3"||minutos=="4"||minutos=="5"||minutos=="6"||minutos=="7"||minutos=="8"||minutos=="9"||minutos=="0"){
      minutos="0"+minutos;
    }
    this.horario.horaentrada = horas+':'+minutos;
    console.log(this.horario.horaentrada);

  }

  horasalida(event){
    var horas = new Date(event.detail.value).getHours().toString();
    if(horas=="6"||horas=="7"||horas=="8"||horas=="9"){
      horas="0"+horas;
    }
    var minutos= new Date(event.detail.value).getMinutes().toString();
    if(minutos=="1"||minutos=="2"||minutos=="3"||minutos=="4"||minutos=="5"||minutos=="6"||minutos=="7"||minutos=="8"||minutos=="9"||minutos=="0"){
      minutos="0"+minutos;
    }
    this.horario.horasalida = horas+':'+minutos;
    console.log(this.horario.horasalida);
  }

  async mensajes() {
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

  async eliminarhorario(){
    this.entrenadorservice.removeHorario(this.idhorario);
    this.nav.navigateForward('/menu-entrenador');
    this.mensaje = "Se elimino correctamente el horario.";
    this.mensajes();
  }

  async editarhorario(){
    this.entrenadorservice.updateHorario(this.horario, this.idhorario).then(() => {
      this.nav.navigateForward('/menu-entrenador');
      this.mensaje = "Se edito correctamente el horario.";
      this.mensajes();
    });
  }
  

}
