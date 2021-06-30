import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EntrenadorGuard } from './guards/entrenador.guard';
import { NoGuardGuard } from './guards/no-guard.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'olvidar-contrasena',
    loadChildren: () => import('./paginas/olvidar-contrasena/olvidar-contrasena.module').then( m => m.OlvidarContrasenaPageModule),
    canActivate: [NoGuardGuard]
    
  },
  {
    path: 'menu-arquero',
    loadChildren: () => import('./paginas/menu-arquero/menu-arquero.module').then( m => m.MenuArqueroPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'verificar-email',
    loadChildren: () => import('./paginas/verificar-email/verificar-email.module').then( m => m.VerificarEmailPageModule),
    canActivate: [NoGuardGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [NoGuardGuard]
  },
  {
    path: 'menu-entrenador',
    loadChildren: () => import('./paginas/menu-entrenador/menu-entrenador.module').then( m => m.MenuEntrenadorPageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoGuardGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil-entrenador',
    loadChildren: () => import('./paginas/perfil-entrenador/perfil-entrenador.module').then( m => m.PerfilEntrenadorPageModule),
    canActivate: [EntrenadorGuard]
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
    path: 'ficha',
    loadChildren: () => import('./paginas/ficha/ficha.module').then( m => m.FichaPageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'solicitud',
    loadChildren: () => import('./paginas/solicitud/solicitud.module').then( m => m.SolicitudPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cambiar-firma',
    loadChildren: () => import('./paginas/cambiar-firma/cambiar-firma.module').then( m => m.CambiarFirmaPageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'horarios',
    loadChildren: () => import('./paginas/horarios/horarios.module').then( m => m.HorariosPageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'visualizar-horarios',
    loadChildren: () => import('./paginas/visualizar-horarios/visualizar-horarios.module').then( m => m.VisualizarHorariosPageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'editar-horarios',
    loadChildren: () => import('./paginas/editar-horarios/editar-horarios.module').then( m => m.EditarHorariosPageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'listado-solicitudes',
    loadChildren: () => import('./paginas/listado-solicitudes/listado-solicitudes.module').then( m => m.ListadoSolicitudesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ver-solicitud/:id',
    loadChildren: () => import('./paginas/ver-solicitud/ver-solicitud.module').then( m => m.VerSolicitudPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listado-arqueros',
    loadChildren: () => import('./paginas/listado-arqueros/listado-arqueros.module').then( m => m.ListadoArquerosPageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'ver-arquero/:id',
    loadChildren: () => import('./paginas/ver-arquero/ver-arquero.module').then( m => m.VerArqueroPageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'ver-horario/:id',
    loadChildren: () => import('./paginas/ver-horario/ver-horario.module').then( m => m.VerHorarioPageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'avance/:id',
    loadChildren: () => import('./paginas/avance/avance.module').then( m => m.AvancePageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'listado-avance',
    loadChildren: () => import('./paginas/listado-avance/listado-avance.module').then( m => m.ListadoAvancePageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'ver-avance/:id',
    loadChildren: () => import('./paginas/ver-avance/ver-avance.module').then( m => m.VerAvancePageModule),
    canActivate: [EntrenadorGuard]
  },
  {
    path: 'arquero-avance',
    loadChildren: () => import('./paginas/arquero-avance/arquero-avance.module').then( m => m.ArqueroAvancePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notificaciones-arquero',
    loadChildren: () => import('./paginas/notificaciones-arquero/notificaciones-arquero.module').then( m => m.NotificacionesArqueroPageModule),
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
