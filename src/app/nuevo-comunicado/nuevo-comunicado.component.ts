import { Component } from '@angular/core';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-nuevo-comunicado',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  templateUrl: './nuevo-comunicado.component.html',
  styleUrls: ['./nuevo-comunicado.component.scss']
})
export class NuevoComunicadoPage {
  titulo = '';
  mensaje = '';
  archivo: File | null = null;

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private auth: Auth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}
onFileChange(event: any) {
  const file = event.target.files[0];

  if (file && file.size > 2 * 1024 * 1024) { // 2 MB
    alert('El archivo es muy grande. Máximo permitido: 2 MB');
    this.archivo = null;
    return;
  }

  this.archivo = file;
}


onImageChange(event: any) {
  const file = event.target.files[0];

  if (file && !file.type.startsWith('image/')) {
    alert('Solo se permiten imágenes.');
    this.archivo = null;
    return;
  }

  this.archivo = file;
}

async publicarComunicado() {
  const loading = await this.loadingCtrl.create({ message: 'Publicando...' });
  await loading.present();

  let adjuntoURL = '';
  const uid = this.auth.currentUser?.uid || 'anónimo';

  try {
    // Intenta subir imagen si hay
    if (this.archivo) {
      const path = `comunicados/${Date.now()}_${this.archivo.name}`;
      const storageRef = ref(this.storage, path);
      await uploadBytes(storageRef, this.archivo);
      adjuntoURL = await getDownloadURL(storageRef);
    }
  } catch (error) {
    console.warn('❗No se pudo subir la imagen. Se publicará solo el texto.');
    // continuamos sin imagen
  }

  try {
    const colRef = collection(this.firestore, 'comunicados');
    await addDoc(colRef, {
      titulo: this.titulo,
      mensaje: this.mensaje,
      fecha: serverTimestamp(),
      autorUID: uid,
      adjuntoURL: adjuntoURL,  // será vacío si falló
      vistoPor: []
    });

    const toast = await this.toastCtrl.create({
      message: 'Comunicado publicado con éxito.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
    this.router.navigate(['/comunicados-director']);

  } catch (error) {
    const toast = await this.toastCtrl.create({
      message: 'Error al publicar el comunicado.',
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  } finally {
    loading.dismiss();
  }
}
  
}
