import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPrincipalPdPage } from './menu-principal-pd.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalPdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPrincipalPdPageRoutingModule {}
