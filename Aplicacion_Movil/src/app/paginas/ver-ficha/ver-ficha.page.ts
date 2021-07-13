import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from '../../interfaces/user.interface';
import { Ficha } from '../../interfaces/ficha.interface';
import { ArqueroService} from '../../servicios/arquero.service';
import { EntrenadorService} from '../../servicios/entrenador.service'; 
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-ver-ficha',
  templateUrl: './ver-ficha.page.html',
  styleUrls: ['./ver-ficha.page.scss'],
})
export class VerFichaPage implements OnInit {
  ficha:Ficha;
  mensaje= null;
  alumno: DatosUsuario;
  idalumno:string;
  formGroup2: FormGroup; 
  fechaingreso: Date;
  SI = "Si";
  fechaactual: Date = new Date();
  constructor(private nav: NavController,private usuarioService: ArqueroService,private Service: EntrenadorService,private route: ActivatedRoute,public formBuilder: FormBuilder,private alertCtrl: AlertController) {
    this.idalumno=this.route.snapshot.params['id'];
    console.log(this.idalumno);
    this.usuarioService.busquedauser(this.idalumno).subscribe((alumno) =>{
      this.alumno = alumno[0];
      this.Service.getFicha(this.alumno.uid).subscribe((ficha) =>{
        this.ficha = ficha[0];
        this.fechaingreso= new Date(this.ficha.fechaescuela['seconds']*1000);
      })
    })
    this.crearvalidaciones2();
   }

  ngOnInit() {
    
  }

  crearvalidaciones2(){
    const fechadev = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const lugarnacimiento = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$")
    ]));
    const direcciondomi = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]));
    const institucion = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$")
    ]));
    const dondetrabaja = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      
    ]));
    const direcciontrabajo = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(50),
    ]));
    const estatur = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]));
    const pes = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]));
    const tipsang = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]));
    const posale = new FormControl('', Validators.compose([
      Validators.required,
      
    ]));
    const desposale = new FormControl('', Validators.compose([
      Validators.maxLength(50),
    ]));
    const fractcua = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const desfractcua = new FormControl('', Validators.compose([
      Validators.maxLength(50),
    ]));
    const operacion = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const desoperacion = new FormControl('', Validators.compose([
      Validators.maxLength(50),
    ]));
    const enferm = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const desenfer = new FormControl('', Validators.compose([
      Validators.maxLength(50),
    ]));
    const tommedo = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const destommedo = new FormControl('', Validators.compose([
      Validators.maxLength(50),
    ]));
    const nombrepadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$"),
    ]));
    const apellidopadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$"),
    ]));
    const cedulapadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));
    const lugarpadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]));
    const emailpadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
      Validators.minLength(10),
      Validators.maxLength(40)
    ]));
    const telefonopadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30)
    ]));
    const nombremadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$"),
    ]));
    const apellidosmadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-ZÑñÁÉÍÓÚáéíóú ]+$"),
    ]));
    const numerocedulamadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));
    const lugarmadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]));
    const emailmadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
      Validators.minLength(10),
      Validators.maxLength(40)
    ]));
    const telefonomadre = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30)
    ]));
    const telemerge = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30)
    ]));

    this.formGroup2 = this.formBuilder.group({
      fechadev,lugarnacimiento,direcciondomi,institucion,dondetrabaja,direcciontrabajo,estatur,pes,tipsang,
      posale,desposale,fractcua,desfractcua,operacion,desoperacion,enferm,desenfer,tommedo,destommedo,
      nombrepadre,apellidopadre,cedulapadre,lugarpadre,emailpadre,telefonopadre,
      nombremadre,apellidosmadre,numerocedulamadre,lugarmadre,emailmadre,telefonomadre,telemerge

    });
  }
  async mensajeingreso() {
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
  cambiofecha2(event){
    this.ficha.fechaescuela = new Date(event.detail.value);

  }
  seleccionalergias(){
     if(this.ficha.alergias=="Si"){
     }else{
       this.ficha.descripcionalergias = "";
     }
  }
 seleccionafracturas(){
    if(this.ficha.fracturas=="Si"){
    }else{
     this.ficha.descripcionfracturas = "";
    }
 }
 seleccionaoperaciones(){
    if(this.ficha.operaciones=="Si"){
    }else{
     this.ficha.descripcionoperaciones = "";
    }
 }
 seleccionaenfermedades(){
    if(this.ficha.enfermedades=="Si"){
    }else{
     this.ficha.descripcionenfermades = "";
    }
 }
 
 seleccionamedicamentos(){
    if(this.ficha.medicamentos=="Si"){
    }else{
     this.ficha.descripcionmedicamentos = "";
    }
 }

 actualizarfichas(idficha:string){
  console.log(idficha);
  this.Service.updateFicha(this.ficha,idficha).then(() => {
      this.nav.navigateForward('menu-arquero');
      this.mensaje="Se actualizo correctamente la ficha.";
      this.mensajeingreso();
   });
 }

}
