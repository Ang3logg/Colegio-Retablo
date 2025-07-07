import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-padres',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './perfil-padres.page.html',
  styleUrls: ['./perfil-padres.page.scss'],
})
export class PerfilPadresPage {
  perfil = {
    nombre: 'Brayan Jair Chavez Oscor',
    correo: 'brayanjairchavez981@gmail.com',
    telefono: '954791072',
    hijo: '',
    grado: '',
    fechaRegistro: ''
  };

  guardarCambios() {
    console.log('✅ Perfil guardado correctamente:', this.perfil);
    // Aquí puedes conectar con un servicio HTTP para enviar datos al backend
  }
}
