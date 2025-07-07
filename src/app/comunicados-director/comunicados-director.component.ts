import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comunicados-director',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './comunicados-director.component.html',
  styleUrls: ['./comunicados-director.component.scss'],
})
export class ComunicadosDirectorPage implements OnInit {
  comunicados$: Observable<any[]> = new Observable();

  private firestore = inject(Firestore);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);

  ngOnInit() {
    const colRef = collection(this.firestore, 'comunicados');
    this.comunicados$ = collectionData(colRef, { idField: 'id' });
  }

  verAdjunto(url: string) {
    if (url) window.open(url, '_blank');
  }

  irACrearComunicado() {
    this.router.navigate(['/nuevo-comunicado']);
  }

  editar(id: string) {
    this.router.navigate(['/editar-comunicado', id]);
  }

  async eliminar(id: string) {
    const confirm = await this.alertCtrl.create({
      header: '¿Eliminar?',
      message: '¿Estás seguro de que deseas eliminar este comunicado?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await deleteDoc(doc(this.firestore, 'comunicados', id));
          },
        },
      ],
    });

    await confirm.present();
  }
}