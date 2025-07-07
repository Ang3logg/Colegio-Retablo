import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detalle-reporte',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './detalle-reporte.page.html',
  styleUrls: ['./detalle-reporte.page.scss'],
})
export class DetalleReportePage {
  reporte: any = null;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.cargarReporte(this.id);
    }
  }

  async cargarReporte(id: string) {
    const docRef = doc(this.firestore, 'reportes', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.reporte = { id: docSnap.id, ...docSnap.data() };
    } else {
      this.reporte = null;
    }
  }

generarPDF() {
  if (!this.reporte) return;

  const imgPath = 'assets/images/aea-pica.png';

  this.convertirImagenABase64(imgPath).then((logoBase64) => {
    const pdf = new jsPDF();
    const margin = 20;
    let y = margin;

    // Configuración del logo
    const imgWidth = 50;
    const imgHeight = 20;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const centerX = (pageWidth - imgWidth) / 2;

    // Insertar logo centrado
    pdf.addImage(logoBase64, 'PNG', centerX, y, imgWidth, imgHeight);
    y += imgHeight + 10;

    // Título del reporte
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('REPORTE DE ASISTENCIA / ACTIVIDAD', pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Detalles básicos
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Fecha: ${this.reporte.fecha}`, margin, y);
    pdf.text(`Tipo: ${this.reporte.tipo}`, margin + 100, y);
    y += 10;

    pdf.text(`Grado y Sección: ${this.reporte.gradoSeccion}`, margin, y);
    y += 10;

    // Línea separadora
    pdf.setDrawColor(0);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Descripción
    const descripcion = this.reporte.descripcion || 'Sin descripción';
    const descripcionLineas = pdf.splitTextToSize(descripcion, pageWidth - 2 * margin);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Descripción:', margin, y);
    y += 8;

    pdf.setFont('helvetica', 'normal');
    pdf.text(descripcionLineas, margin, y);
    y += descripcionLineas.length * 7;

    // Espacio para firma
    y += 30;
    pdf.line(margin, y, margin + 80, y);
    pdf.text('Firma del Responsable', margin, y + 7);

    // Guardar el PDF
    pdf.save(`Reporte_${this.reporte.fecha}.pdf`);
  }).catch((error) => {
    console.error('Error al cargar la imagen para el PDF:', error);
  });
}



  async eliminarReporte() {
    const alerta = await this.alertCtrl.create({
      header: '¿Eliminar?',
      message: '¿Estás seguro de eliminar este reporte?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            if (this.id) {
              await deleteDoc(doc(this.firestore, 'reportes', this.id));
              this.navCtrl.navigateBack('/reportes-asistencia');
            }
          },
        },
      ],
    });

    await alerta.present();
  }
  convertirImagenABase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('No se pudo obtener el contexto');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}

}
