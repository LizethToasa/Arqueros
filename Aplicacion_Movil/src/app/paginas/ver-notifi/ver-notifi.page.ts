import { Component, OnInit } from '@angular/core';
import { ArqueroService } from '../../servicios/arquero.service';
import { NotificacionEntrenador } from '../../interfaces/notificacion-entrenador.interface';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-ver-notifi',
  templateUrl: './ver-notifi.page.html',
  styleUrls: ['./ver-notifi.page.scss'],
})
export class VerNotifiPage implements OnInit {
  idnotificacion:string;
  notificacion: NotificacionEntrenador;
  cont = 1;
  constructor(private usuarioService: ArqueroService,private route: ActivatedRoute) { 
    this.idnotificacion=this.route.snapshot.params['id'];
    this.usuarioService.getNotificacionEntrenador(this.idnotificacion).subscribe(notificacion => {
      this.notificacion= notificacion
      this.notificacion.color = "#FFFFFF";
      if(this.cont = 1){
        this.usuarioService.updateNotificacionEntrenador(this.notificacion,this.idnotificacion);
        this.cont = 2;
      }
    });

  }

  ngOnInit() {
  }

}
