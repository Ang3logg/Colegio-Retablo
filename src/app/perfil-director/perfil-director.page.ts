import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-perfil-director',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './perfil-director.page.html',
  styleUrls: ['./perfil-director.page.scss'],
})
export class PerfilDirectorPage implements OnInit {
  perfil = {
    nombre: '',
    correo: '',
    telefono: '',
    cargo: '',
    departamento: '',
    fechaIngreso: ''
  };

  private perfilId = 'perfil-actual'; // puedes usar un ID único si hay varios directores

  constructor(
    private firestore: Firestore,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    const docRef = doc(this.firestore, 'perfiles-directores', this.perfilId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.perfil = docSnap.data() as any;
    }
  }

  async guardarCambios() {
    const docRef = doc(this.firestore, 'perfiles-directores', this.perfilId);
    await setDoc(docRef, this.perfil);

    const alerta = await this.alertCtrl.create({
      header: '✅ Guardado',
      message: 'Los cambios han sido guardados correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}
