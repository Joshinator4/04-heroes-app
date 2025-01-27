import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)//esto añade el módulo por carga perezosa(LazyLoad)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m=>m.HeroesModule)//esto añade el módulo por carga perezosa(LazyLoad)
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full' //significa que la URL debe coincidir exactamente con la ruta especificada. Si hay una coincidencia parcial, la ruta no se activará.
  },
  {
    path: '**',
    redirectTo: '404'// (**) por si se introduce una ruta errónea, que redirija a 404
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
