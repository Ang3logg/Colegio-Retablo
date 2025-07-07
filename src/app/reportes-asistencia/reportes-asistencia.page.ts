import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- Necesario para ngModel
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reportes-asistencia',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], // <--- Agregado FormsModule
  templateUrl: './reportes-asistencia.page.html',
  styleUrls: ['./reportes-asistencia.page.scss'],
})
export class ReportesAsistenciaPage implements OnInit {

  reportes$!: Observable<any[]>;
  reportesOriginal: any[] = [];
  reportesFiltrados: any[] = [];
  busqueda: string = '';

  constructor(
    private navCtrl: NavController,
    private firestore: Firestore
  ) {}

  // Se ejecuta cada vez que entras a la vista
  ionViewWillEnter() {
    this.cargarReportes();
  }

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {
    const reportesRef = collection(this.firestore, 'reportes');
    this.reportes$ = collectionData(reportesRef, { idField: 'id' });

    this.reportes$.subscribe((data) => {
      this.reportesOriginal = data;
      this.reportesFiltrados = data;
    });
  }

  filtrarReportes() {
    const texto = this.busqueda.trim().toLowerCase();

    if (texto === '') {
      this.reportesFiltrados = [...this.reportesOriginal];
    } else {
      this.reportesFiltrados = this.reportesOriginal.filter((reporte) =>
        reporte.titulo?.toLowerCase().includes(texto) ||
        reporte.tipo?.toLowerCase().includes(texto) ||
        reporte.fecha?.toLowerCase().includes(texto)
      );
    }
  }

  goToNuevoReporte() {
    this.navCtrl.navigateForward('/nuevo-reporte');
  }

  verDetalle(id: string) {
    this.navCtrl.navigateForward(`/detalle-reporte/${id}`);
  }
}
