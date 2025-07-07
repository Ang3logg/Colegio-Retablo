import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule, AlertController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar-comunicado',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  templateUrl: './editar-comunicado.component.html',
  styleUrls: ['./editar-comunicado.component.scss'],
})
export class EditarComunicadoPage implements OnInit {
  id: string = '';
  titulo: string = '';
  mensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    const ref = doc(this.firestore, 'comunicados', this.id);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data: any = snap.data();
      this.titulo = data.titulo;
      this.mensaje = data.mensaje;
    }
  }

  async guardarCambios() {
    const loading = await this.loadingCtrl.create({ message: 'Actualizando...' });
    await loading.present();

    try {
      const ref = doc(this.firestore, 'comunicados', this.id);
      await updateDoc(ref, {
        titulo: this.titulo,
        mensaje: this.mensaje
      });

      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Comunicado actualizado correctamente.',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/comunicados-director']);
    } catch (error) {
      console.error(error);
    } finally {
      loading.dismiss();
    }
  }
}
