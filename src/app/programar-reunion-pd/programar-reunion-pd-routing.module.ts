import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramarReunionPdPage } from './programar-reunion-pd.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramarReunionPdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramarReunionPdPageRoutingModule {}
