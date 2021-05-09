import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EntrenadorGuard } from './guards/entrenador.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'olvidar-contrasena',
    loadChildren: () => import('./paginas/olvidar-contrasena/olvidar-contrasena.module').then( m => m.OlvidarContrasenaPageModule),
    
  },
  {
    path: 'menu-arquero',
    loadChildren: () => import('./paginas/menu-arquero/menu-arquero.module').then( m => m.MenuArqueroPageModule),
    canActivate: [AuthGuard]
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
    loadChildren: () => import('./paginas/menu-entrenador/menu-entrenador.module').then( m => m.MenuEntrenadorPageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil-entrenador',
    loadChildren: () => import('./paginas/perfil-entrenador/perfil-entrenador.module').then( m => m.PerfilEntrenadorPageModule)
  },
  {
    path: 'perfil-arquero',
    loadChildren: () => import('./paginas/perfil-arquero/perfil-arquero.module').then( m => m.PerfilArqueroPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registro-entrenador',
    loadChildren: () => import('./paginas/registro-entrenador/registro-entrenador.module').then( m => m.RegistroEntrenadorPageModule)
  },
  {
    path: 'registro-administrador',
    loadChildren: () => import('./paginas/registro-administrador/registro-administrador.module').then( m => m.RegistroAdministradorPageModule)
  },
  {
    path: 'listado-arqueros',
    loadChildren: () => import('./paginas/listado-arqueros/listado-arqueros.module').then( m => m.ListadoArquerosPageModule)
  },
  {
    path: 'ficha',
    loadChildren: () => import('./paginas/ficha/ficha.module').then( m => m.FichaPageModule)
  },
  {
    path: 'solicutud',
    loadChildren: () => import('./paginas/solicutud/solicutud.module').then( m => m.SolicutudPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
