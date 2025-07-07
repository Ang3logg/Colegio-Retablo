import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-nueva-reunion',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './nueva-reunion.page.html',
  styleUrls: ['./nueva-reunion.page.scss'],
})
export class NuevaReunionPage {
  asunto = '';
  participantes = '';
  fecha = '';
  hora = '';
  meridiano = 'AM';
  descripcion = '';
  duracion = '';
  ubicacion = '';
  responsable = '';
  requiereConfirmacion = false;
  observaciones = '';

  constructor(
    private navCtrl: NavController,
    private firestore: Firestore,
    private alertCtrl: AlertController
  ) {}

  async guardarReunion() {
    if (!this.asunto || !this.participantes || !this.fecha || !this.hora) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor completa todos los campos obligatorios.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const horaFormateada = this.hora + ' ' + this.meridiano;

    const nuevaReunion = {
      asunto: this.asunto,
      participantes: this.participantes,
      fecha: this.fecha,
      hora: horaFormateada,
      descripcion: this.descripcion,
      duracion: this.duracion,
      ubicacion: this.ubicacion,
      responsable: this.responsable,
      requiereConfirmacion: this.requiereConfirmacion,
      observaciones: this.observaciones,
      enlaceZoom: this.enlaceZoom,
    };

    await addDoc(collection(this.firestore, 'reuniones'), nuevaReunion);

    const success = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Reunión guardada correctamente.',
      buttons: ['OK']
    });

    await success.present();
    this.navCtrl.navigateBack('/reuniones-programadas-director');
  }
  enlaceZoom: string = '';

}
