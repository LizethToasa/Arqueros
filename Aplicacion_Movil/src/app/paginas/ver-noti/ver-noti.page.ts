import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ArqueroService } from '../../servicios/arquero.service';
import { Solicitud } from '../../interfaces/solicitud.interface';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { NotificacionArquero } from '../../interfaces/notificacion-arquero.interface';
@Component({
  selector: 'app-ver-noti',
  templateUrl: './ver-noti.page.html',
  styleUrls: ['./ver-noti.page.scss'],
})
export class VerNotiPage implements OnInit {
  idnotificacion:string;
  notificacion: NotificacionArquero;
  cont = 1;
  espera = "espera";
  aceptar = "aceptar";
  rechazar = "rechazar";
  anulado = "anulado";
  solicitud: Solicitud;
  entrenador:string;
  constructor(private route: ActivatedRoute,private usuarioService: ArqueroService,private entrenadorService: EntrenadorService) {
    this.idnotificacion=this.route.snapshot.params['id'];
    this.usuarioService.getNotificacionArquero(this.idnotificacion).subscribe(notificacion => {
      this.notificacion= notificacion;
      this.notificacion.color = "#FFFFFF";
      if(this.cont = 1){
        this.usuarioService.updateNotificacionArquero(this.notificacion,this.idnotificacion);
        this.cont = 2;

        this.usuarioService.getSolicitud(this.notificacion.idsolicitud).subscribe(solicitud => {
            this.solicitud = solicitud;
            this.entrenadorService.getEntrenador(this.solicitud.entrenador).subscribe((entrenador) =>{
              this.entrenador = entrenador.nombres + " " +entrenador.apellidos;
            });
        });
       

      }
      
    });
    
  
   }

  ngOnInit() {
  }

}
