import { Component } from '@angular/core';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-recuperar-clave',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage {
  correo: string = '';

  constructor(private alertCtrl: AlertController, private navCtrl: NavController) {}

  async enviarRecuperacion() {
    if (!this.correo || !this.correo.includes('@')) {
      this.mostrarAlerta('Correo inválido', 'Por favor ingresa un correo válido.');
      return;
    }

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, this.correo);
      this.mostrarAlerta('Correo enviado', 'Revisa tu bandeja de entrada para recuperar tu contraseña.');
      this.navCtrl.back();
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudo enviar el correo. Verifica que esté registrado.');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
