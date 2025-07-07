import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-reunion',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule], // <-- AÑADE RouterModule AQUÍ
  templateUrl: './detalle-reunion.component.html',
  styleUrls: ['./detalle-reunion.component.scss'],
})
export class DetalleReunionComponent implements OnInit {
  reunion: any = null;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      const docRef = doc(this.firestore, 'reuniones', this.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.reunion = { id: docSnap.id, ...docSnap.data() };
      }
    }
  }
}
