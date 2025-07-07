import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edicion-reporte',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './edicion-reporte.page.html',
  styleUrls: ['./edicion-reporte.page.scss'],
})
export class EdicionReportePage implements OnInit {
  id: string | null = null;
  reporte: any = {
    titulo: '',
    tipo: '',
    fecha: '',
    gradoSeccion: '',
    descripcion: ''
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
      const docRef = doc(this.firestore, 'reportes', this.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.reporte = docSnap.data();
      } else {
        this.reporte = null;
      }
    }
  }

  async guardarCambios() {
    if (!this.id) return;

    const docRef = doc(this.firestore, 'reportes', this.id);
    await updateDoc(docRef, this.reporte);

    const alert = await this.alertCtrl.create({
      header: '✅ Éxito',
      message: 'El reporte fue actualizado correctamente.',
      buttons: ['Aceptar']
    });
    await alert.present();
    this.router.navigate(['/reportes-asistencia']);
  }

  async eliminarReporte() {
    if (!this.id) return;

    const confirm = await this.alertCtrl.create({
      header: '¿Eliminar?',
      message: '¿Estás seguro de eliminar este reporte?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            const docRef = doc(this.firestore, 'reportes', this.id!);
            await deleteDoc(docRef);
            const alert = await this.alertCtrl.create({
              header: 'Eliminado',
              message: 'El reporte fue eliminado correctamente.',
              buttons: ['Aceptar']
            });
            await alert.present();
            this.router.navigate(['/reportes-asistencia']);
          }
        }
      ]
    });
    await confirm.present();
  }
}
