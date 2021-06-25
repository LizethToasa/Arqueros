import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { EntrenadorService } from '../../servicios/entrenador.service';
import { Horario } from '../../interfaces/horario.interface';
@Component({
  selector: 'app-ver-horario',
  templateUrl: './ver-horario.page.html',
  styleUrls: ['./ver-horario.page.scss'],
})
export class VerHorarioPage implements OnInit {
  idhorario:string;
  horario:  Horario;
  constructor(private route: ActivatedRoute, private entrenadorservice: EntrenadorService) {
    this.idhorario=this.route.snapshot.params['id'];
    this.entrenadorservice.getHoario(this.idhorario).subscribe(horario => {
      this.horario = horario;
      console.log(this.horario);
    });
   }

  ngOnInit() {
  }

}
