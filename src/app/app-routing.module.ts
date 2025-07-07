import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'entrada',
    pathMatch: 'full'
  },
  {
    path: 'entrada',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'intro',
    loadComponent: () => import('./auth/screens/intro/intro.page').then(m => m.IntroPage)
  },
  {
    path: 'crear-cuenta',
    loadComponent: () =>
      import('./auth/screens/crear-cuenta/crear-cuenta.page').then(m => m.CrearCuentaPage)
  },
  {
    path: 'olvidar-contrasena',
    loadComponent: () => import('./auth/screens/olvidar-contrasena/olvidar-contrasena.page').then( m => m.OlvidarContrasenaPage)
  },
  {
    path: 'restablecer-contrasena',
    loadComponent: () => import('./auth/screens/restablecer-contrasena/restablecer-contrasena.page').then( m => m.RestablecerContrasenaPage)
  },
  {
    path: 'crear-google',
    loadComponent: () => import('./auth/screens/crear-google/crear-google.page').then( m => m.CrearGooglePage)
  },
  {
  path: 'calendario',
  loadComponent: () => import('./calendario/calendario.page').then(m => m.CalendarioPage)
  },
  {
    path: 'calendario-pd',
    loadChildren: () => import('./calendario-pd/calendario-pd.module').then(m => m.CalendarioPdPageModule)
  },
  {
    path: 'recordatorio',
    loadComponent: () => import('./recordatorio/recordatorio.page').then(m => m.RecordatorioPage)
  }
  ,
  {
    path: 'menu-principal',
    loadComponent: () => import('./menu-principal/menu-principal.page').then(m => m.MenuPrincipalPage)
  },
  {
    path: 'reuniones-programadas-director',
    loadChildren: () => import('./reuniones-programadas-director/reuniones-programadas-director.module').then( m => m.ReunionesProgramadasDirectorPageModule)
  },
  {
    path: 'programar-reunion-pd',
    loadChildren: () =>
      import('./programar-reunion-pd/programar-reunion-pd.module').then(m => m.ProgramarReunionPdPageModule)
  },
  {
    path: 'perfil-director',
    loadComponent: () => import('./perfil-director/perfil-director.page').then(m => m.PerfilDirectorPage)
  },
  {
    path: 'perfil-padres',
    loadComponent: () =>
      import('./perfil-padres/perfil-padres.page').then(m => m.PerfilPadresPage)
  },
  {
    path: 'mensajes',
    loadComponent: () => import('./mensajes/mensajes.page').then(m => m.MensajesPage)
  },
    {
    path: 'configuracion',
    loadComponent: () => import('./configuracion/configuracion.page').then(m => m.ConfiguracionPage)
  },
    {
    path: 'reportes-asistencia',
    loadComponent: () => import('./reportes-asistencia/reportes-asistencia.page').then(m => m.ReportesAsistenciaPage)
  },
  {
    path: 'reportes',
    loadComponent: () => import('./reportes/reportes.page').then(m => m.ReportesPage)
  },
  {
  path: 'nuevo-reporte',
  loadComponent: () =>
    import('./nuevo-reporte/nuevo-reporte.page').then(m => m.NuevoReportePage)
  }
  ,
    {
    path: 'nueva-reunion',
    loadComponent: () =>
      import('./nueva-reunion/nueva-reunion.page').then(m => m.NuevaReunionPage)
  }
  ,
  {
    path: 'detalle-reunion/:id',
    loadComponent: () => import('./detalle-reunion/detalle-reunion.component').then(m => m.DetalleReunionComponent),
  }
  ,
    {
    path: 'detalle-reporte/:id',
    loadComponent: () =>
      import('./detalle-reporte/detalle-reporte.page').then(m => m.DetalleReportePage)
  },
  {
    path: 'edicion-reporte/:id',
    loadComponent: () =>
      import('./edicion-reporte/edicion-reporte.page').then(m => m.EdicionReportePage)
  },
  {
    path: 'edicion-reunion/:id',
    loadComponent: () =>
      import('./edicion-reunion/edicion-reunion.component').then(
        (m) => m.EdicionReunionComponent
      ),
  },
  {
    path: 'menu-registro',
    loadChildren: () => import('./menu-principal-pd/menu-principal-pd.module').then( m => m.MenuPrincipalPdPageModule)
  },
  {
    path: 'menu-principal-pd',
    loadChildren: () => import('./menu-principal-pd/menu-principal-pd.module').then( m => m.MenuPrincipalPdPageModule)
  },
  {
    path: 'programar-reunion-pd',
    loadChildren: () => import('./programar-reunion-pd/programar-reunion-pd.module').then( m => m.ProgramarReunionPdPageModule)
  },
  {
    path: 'recuperar-clave',
    loadComponent: () => import('./recuperar-clave/recuperar-clave.page').then(m => m.RecuperarClavePage)
  },
  {
    path: 'privacidad',
    loadComponent: () => import('./privacidad/privacidad.page').then(m => m.PrivacidadPage)
  },
  {
  path: 'comunicados-director',
  loadComponent: () =>
    import('./comunicados-director/comunicados-director.component').then(
      m => m.ComunicadosDirectorPage
    )
  },
  {
    path: 'nuevo-comunicado',
    loadComponent: () => import('./nuevo-comunicado/nuevo-comunicado.component').then(m => m.NuevoComunicadoPage)
  },
  {
  path: 'editar-comunicado/:id',
  loadComponent: () => import('./editar-comunicado/editar-comunicado.component').then(m => m.EditarComunicadoPage)
},


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
