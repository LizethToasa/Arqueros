import { Component, OnInit } from '@angular/core';
import { ArqueroService } from '../../servicios/arquero.service';
import { DatosUsuario } from '../../interfaces/user.interface';
@Component({
  selector: 'app-listado-arqueros',
  templateUrl: './listado-arqueros.page.html',
  styleUrls: ['./listado-arqueros.page.scss'],
})
export class ListadoArquerosPage implements OnInit {
  usuarios: DatosUsuario[];
  constructor(private Service: ArqueroService) { 
    this.Service.getArqueros().subscribe((usuarios) =>{

      this.usuarios = usuarios;
      console.log(usuarios);
    })
  }

  ngOnInit() {
  }

}
