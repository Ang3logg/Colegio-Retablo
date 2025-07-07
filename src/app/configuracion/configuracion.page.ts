import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule], // 👈 Aquí agregamos FormsModule
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})

export class ConfiguracionPage {
  notificacionesActivas = true; // SIN FUNCIONALIDAD ACTUAL
  modoOscuro = false;
  idiomaSeleccionado: string = 'es';

  constructor(private router: Router) {
    // Cargar estado guardado de idioma y modo oscuro
    const idioma = localStorage.getItem('idioma');
    if (idioma) this.idiomaSeleccionado = idioma;

    const darkMode = localStorage.getItem('modoOscuro');
    this.modoOscuro = darkMode === 'true';
    document.body.classList.toggle('dark', this.modoOscuro);
  }

  toggleNotificaciones() {
    this.notificacionesActivas = !this.notificacionesActivas;
  }

  toggleDarkMode() {
  this.modoOscuro = !this.modoOscuro;
  document.body.classList.toggle('dark', this.modoOscuro);
  localStorage.setItem('modoOscuro', this.modoOscuro.toString());
}
ngOnInit() {
  const oscuro = localStorage.getItem('modoOscuro');
  this.modoOscuro = oscuro === 'true';
  document.body.classList.toggle('dark', this.modoOscuro);

  this.idiomaSeleccionado = localStorage.getItem('idioma') || 'es';
}



  cambiarIdioma(event: any) {
  this.idiomaSeleccionado = event.detail.value;
  localStorage.setItem('idioma', this.idiomaSeleccionado);
  console.log('Idioma cambiado a:', this.idiomaSeleccionado);
  // Podrías usar i18n o ngx-translate aquí más adelante
}


  async cerrarSesion() {
    const auth = getAuth();
    await signOut(auth);
    localStorage.clear(); // Limpia datos locales
    this.router.navigate(['/intro']);
  }
}
