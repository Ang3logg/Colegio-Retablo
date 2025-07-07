import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPadresPage } from './perfil-padres.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPadresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPadrePageRoutingModule {}
