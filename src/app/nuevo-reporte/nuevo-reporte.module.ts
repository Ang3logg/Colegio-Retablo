import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NuevoReportePageRoutingModule } from './nuevo-reporte-routing.module';
import { NuevoReportePage } from './nuevo-reporte.page'; // standalone ✅

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoReportePageRoutingModule,
    NuevoReportePage // ✅ IMPORTAR, no declarar
  ],
  // ❌ Eliminar esta línea:
  // declarations: [NuevoReportePage]
})
export class NuevoReportePageModule {}
