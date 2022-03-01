import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../servicios/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.page.html',
  styleUrls: ['./verificar-email.page.scss'],
})
export class VerificarEmailPage implements OnInit {

  user$: Observable<User> = this.authSvc.afAuth.user;
  entrenador$: Observable<User> = this.authSvc.afAuth.user;
  administrador$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  async reenviar(): Promise<void> {
    try {
      await this.authSvc.sendVerifcationEmail();
    } catch (error) {
      console.log('Error->', error);
    }
  }
  ngOnDestroy(): void {
    this.authSvc.logout();
  }
  cerrar(){
    this.authSvc.logout();
  }

}
