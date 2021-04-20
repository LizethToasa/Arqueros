import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'olvidar-contrasena',
    loadChildren: () => import('./paginas/olvidar-contrasena/olvidar-contrasena.module').then( m => m.OlvidarContrasenaPageModule)
  },
  {
    path: 'menu-arquero',
    loadChildren: () => import('./paginas/menu-arquero/menu-arquero.module').then( m => m.MenuArqueroPageModule)
  },
  {
    path: 'verificar-email',
    loadChildren: () => import('./paginas/verificar-email/verificar-email.module').then( m => m.VerificarEmailPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'menu-entrenador',
    loadChildren: () => import('./paginas/menu-entrenador/menu-entrenador.module').then( m => m.MenuEntrenadorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
