import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProgramarReunionPdPageRoutingModule } from './programar-reunion-pd-routing.module';
import { ProgramarReunionPdPage } from './programar-reunion-pd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramarReunionPdPageRoutingModule,
    ProgramarReunionPdPage // ✅ componente standalone importado correctamente
  ]
})
export class ProgramarReunionPdPageModule {}
