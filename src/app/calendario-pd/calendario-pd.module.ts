import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-pd-routing.module';
import { CalendarioPdPage } from './calendario-pd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule
  ],
  declarations: [CalendarioPdPage]
})
export class CalendarioPdPageModule {}
