import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edicion-reunion',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './edicion-reunion.component.html',
  styleUrls: ['./edicion-reunion.component.scss'],
})
export class EdicionReunionComponent implements OnInit {
  id: string | null = null;
  reunion: any = {
    asunto: '',
    participantes: '',
    fecha: '',
    hora: '',
    duracion: '',
    ubicacion: '',
    responsable: '',
    requiereConfirmacion: false,
    descripcion: '',
    observaciones: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: Firestore,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      const docRef = doc(this.firestore, 'reuniones', this.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.reunion = docSnap.data();
      }
    }
  }

  async guardarCambios() {
    if (!this.id) return;

    const docRef = doc(this.firestore, 'reuniones', this.id);
    await updateDoc(docRef, this.reunion);

    const alerta = await this.alertCtrl.create({
      header: '✅ Cambios guardados',
      message: 'La reunión fue actualizada correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    this.router.navigate(['/reuniones-programadas-director']);
  }
  enlaceZoom: string = '';

}
