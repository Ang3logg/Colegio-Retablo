import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

// ✅ Importa el componente standalone en lugar de declararlo
import { MenuPrincipalPdPage } from './menu-principal-pd.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalPdPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    MenuPrincipalPdPage // 👈 Esto es clave: lo IMPORTAS, no lo declaras
  ]
})
export class MenuPrincipalPdPageModule {}
