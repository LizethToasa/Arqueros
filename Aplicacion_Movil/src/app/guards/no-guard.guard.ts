import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArqueroService } from '../servicios/arquero.service';
import { take, map } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NoGuardGuard implements CanActivate {
  constructor(private usuarioService: ArqueroService, private router: Router,private AFauth : AngularFireAuth) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AFauth.authState.pipe(map(auth => {
        if(isNullOrUndefined(auth)){
         return true;
        }else{

          this.usuarioService.getArquero(auth.uid).subscribe(usuario => {
            console.log(usuario);
            if(usuario){
              this.router.navigate(['/menu-arquero']);
            }else{
              this.router.navigate(['/menu-entrenador']);
            }
          });


          return false;
        }
 
       }))
  }
  
}
