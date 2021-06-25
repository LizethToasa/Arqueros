import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from '../../interfaces/user.interface';
import { ArqueroService} from '../../servicios/arquero.service';
@Component({
  selector: 'app-listado-arqueros',
  templateUrl: './listado-arqueros.page.html',
  styleUrls: ['./listado-arqueros.page.scss'],
})
export class ListadoArquerosPage implements OnInit {
  arqueros: DatosUsuario[];
  constructor(private usuarioService: ArqueroService) {
    this.usuarioService.getArqueros().subscribe(usuario => {
      this.arqueros = usuario;
    });
   }

  ngOnInit() {
  }
  busqueda(busquedanombre){
    console.log(busquedanombre.value);
    this.usuarioService.busquedauser2(busquedanombre.value).subscribe(usuario => {
      this.arqueros = usuario;
    });
  }

}
