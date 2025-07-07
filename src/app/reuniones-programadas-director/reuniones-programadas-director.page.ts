import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { Firestore, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reuniones-programadas-director',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './reuniones-programadas-director.page.html',
  styleUrls: ['./reuniones-programadas-director.page.scss'],
})
export class ReunionesProgramadasDirectorPage implements OnInit {
  reuniones$!: Observable<any[]>;

  constructor(
    private navCtrl: NavController,
    private firestore: Firestore,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Obtener las reuniones desde Firestore
    const reunionesRef = collection(this.firestore, 'reuniones');
    this.reuniones$ = collectionData(reunionesRef, { idField: 'id' });
  }

  goToNuevaReunion() {
    this.navCtrl.navigateForward('/nueva-reunion');
  }

  goToDetalleReunion(id: string) {
    this.navCtrl.navigateForward(`/detalle-reunion/${id}`);
  }

  async eliminarReunion(id: string) {
    const alert = await this.alertCtrl.create({
      header: '¿Eliminar reunión?',
      message: '¿Estás seguro de eliminar esta reunión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await deleteDoc(doc(this.firestore, 'reuniones', id));
          },
        },
      ],
    });

    await alert.present();
  }
}
