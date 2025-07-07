import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaReunionPage } from './nueva-reunion.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaReunionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaReunionPageRoutingModule {}
