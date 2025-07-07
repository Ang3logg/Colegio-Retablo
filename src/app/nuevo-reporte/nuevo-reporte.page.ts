import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-nuevo-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './nuevo-reporte.page.html',
  styleUrls: ['./nuevo-reporte.page.scss'],
})
export class NuevoReportePage {
  tipoReporte: string = '';
  gradoSeccion: string = '';
  fecha: string = '';
  descripcion: string = '';

  constructor(
    private navCtrl: NavController,
    private firestore: Firestore,
    private auth: Auth
  ) {}

  async guardarReporte() {
    if (!this.tipoReporte || !this.gradoSeccion || !this.fecha) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const user = this.auth.currentUser;

    if (!user) {
      alert('Usuario no autenticado');
      return;
    }

    const nuevoReporte = {
      tipo: this.tipoReporte,
      gradoSeccion: this.gradoSeccion,
      fecha: this.fecha,
      descripcion: this.descripcion,
      titulo: `${this.tipoReporte} mensual - ${this.gradoSeccion}`,
      uid: user.uid
    };

    try {
      const reportesRef = collection(this.firestore, 'reportes');
      await addDoc(reportesRef, nuevoReporte);
      alert('✅ Reporte guardado con éxito');
      this.navCtrl.navigateBack('/reportes-asistencia');
    } catch (error) {
      console.error('❌ Error al guardar reporte:', error);
      alert('Error al guardar el reporte');
    }
  }
}
