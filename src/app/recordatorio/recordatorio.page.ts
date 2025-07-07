import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AgendaService, Agenda } from '../services/agenda.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-recordatorio',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './recordatorio.page.html',
  styleUrls: ['./recordatorio.page.scss'],
})
export class RecordatorioPage implements OnInit {
  diaSeleccionado: number = new Date().getDate();
  mesSeleccionado: string = this.obtenerMes(new Date().getMonth());

  recordatorios$: Observable<Agenda[]> | null = null;
  reunionesDelDia$: Observable<any[]> | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agendaService: AgendaService,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['dia']) {
        this.diaSeleccionado = Number(params['dia']);
      }
      if (params['mes']) {
        this.mesSeleccionado = params['mes'];
      }

      this.cargarRecordatorios();
      this.cargarReunionesDelDia();
    });
  }

  obtenerMes(mesIndex: number): string {
    const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    return meses[mesIndex];
  }

  obtenerIndiceMes(mesAbreviado: string): number {
    const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    return meses.indexOf(mesAbreviado);
  }

  cargarRecordatorios() {
    this.recordatorios$ = this.agendaService.getAgendasPorDiaMes(
      this.diaSeleccionado,
      this.mesSeleccionado
    );
  }

  cargarReunionesDelDia() {
    const mesIndex = this.obtenerIndiceMes(this.mesSeleccionado);
    const anio = new Date().getFullYear();
    const dia = this.diaSeleccionado.toString().padStart(2, '0');
    const mes = (mesIndex + 1).toString().padStart(2, '0');
    const fechaComparar = `${anio}-${mes}-${dia}`; // formato "2025-07-06"

    const reunionesRef = collection(this.firestore, 'reuniones');
    this.reunionesDelDia$ = collectionData(reunionesRef, { idField: 'id' }).pipe(
      map((reuniones: any[]) =>
        reuniones.filter(reunion => reunion.fecha === fechaComparar)
      )
    );
  }

  editarRecordatorio(agenda: Agenda) {
    const nuevoMotivo = prompt('Editar motivo:', agenda.motivo);
    if (nuevoMotivo !== null && nuevoMotivo.trim() !== '') {
      this.agendaService.actualizarAgenda(agenda.id!, { motivo: nuevoMotivo }).then(() => {
        this.cargarRecordatorios();
      });
    }
  }

  eliminarRecordatorio(agenda: Agenda) {
    if (confirm('¿Seguro de eliminar este recordatorio?')) {
      this.agendaService.eliminarAgenda(agenda.id!).then(() => {
        this.cargarRecordatorios();
      });
    }
  }

  irARegistrarAgenda() {
    const now = new Date();
    const anio = now.getFullYear();
    let horas = now.getHours();
    const minutos = now.getMinutes().toString().padStart(2, '0');
    const turno = horas >= 12 ? 'PM' : 'AM';

    if (horas === 0) {
      horas = 12;
    } else if (horas > 12) {
      horas -= 12;
    }

    const hora = `${horas.toString().padStart(2, '0')}:${minutos}`;

    this.router.navigate(['/registrar-agenda'], {
      queryParams: {
        dia: this.diaSeleccionado,
        mes: this.mesSeleccionado,
        anio: anio,
        hora: hora,
        turno: turno
      }
    });
  }
}
