import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal-pd',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './menu-principal-pd.page.html',
  styleUrls: ['./menu-principal-pd.page.scss'],
})
export class MenuPrincipalPdPage {

  constructor(private router: Router) {}

 goToCalendario() {
  this.router.navigate(['/calendario-pd']);
}
 
  goToMensajes() {
    this.router.navigate(['/mensajes']);
  }

goToProgramarReunion() {
  this.router.navigate(['/programar-reunion-pd']);
}


  goToReportes() {
    this.router.navigate(['/reportes']);
  }

  goToConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  goToPerfil() {
    this.router.navigate(['/perfil-padres']);
  }
}
