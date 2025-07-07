import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioPdPage  } from './calendario-pd.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioPdPage 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioPageRoutingModule {}
