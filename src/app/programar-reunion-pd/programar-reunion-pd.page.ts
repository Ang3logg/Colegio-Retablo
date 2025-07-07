import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-programar-reunion-pd',
  standalone: true,
  templateUrl: './programar-reunion-pd.page.html',
  styleUrls: ['./programar-reunion-pd.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProgramarReunionPdPage {
  fecha: string = '';
  hora: string = '';
  motivo: string = '';
  today: string = new Date().toISOString().split('T')[0];

  constructor(private router: Router, private toastCtrl: ToastController) {}

  async guardarReunion() {
    if (!this.fecha || !this.hora || !this.motivo.trim()) {
      this.mostrarToast('⚠️ Por favor completa todos los campos');
      return;
    }

    // Validar que la fecha no sea anterior a hoy
    const hoy = new Date();
    const fechaSeleccionada = new Date(this.fecha);
    hoy.setHours(0, 0, 0, 0);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      this.mostrarToast('📆 La fecha ya pasó. Elige una válida.');
      return;
    }

    const nuevaReunion = {
  asunto: this.motivo, // ← renombrado para coincidir con el listado
  fecha: this.fecha,
  hora: this.hora
};


    const reuniones = JSON.parse(localStorage.getItem('reuniones-pd') || '[]');
reuniones.push(nuevaReunion);
localStorage.setItem('reuniones-pd', JSON.stringify(reuniones));


    this.mostrarToast('✅ Reunión guardada correctamente');
    this.router.navigate(['/menu-principal-pd']);
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom',
      color: 'medium'
    });
    toast.present();
  }
}

