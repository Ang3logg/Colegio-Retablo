import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  displayedMonth: number;
  displayedYear: number;

  weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  calendarDays: {
    day: number,
    dayName: string,
    events?: { titulo: string, hora: string }[]
  }[] = [];

  constructor(
    private router: Router,
    private firestore: Firestore
  ) {
    const now = new Date();
    this.displayedMonth = now.getMonth();
    this.displayedYear = now.getFullYear();
  }

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate();
    const reunionesRef = collection(this.firestore, 'reuniones');

    collectionData(reunionesRef, { idField: 'id' }).pipe(
      map((reuniones: any[]) => {
        const reunionesPorDia: { [key: number]: { titulo: string, hora: string }[] } = {};

        reuniones.forEach(reunion => {
          const fecha = new Date(reunion.fecha);

          if (
            fecha.getUTCMonth() === this.displayedMonth &&
            fecha.getUTCFullYear() === this.displayedYear
          ) {
            const dia = fecha.getUTCDate();

            if (!reunionesPorDia[dia]) {
              reunionesPorDia[dia] = [];
            }

            reunionesPorDia[dia].push({
              titulo: reunion.asunto || 'Reunión',
              hora: reunion.hora || ''
            });
          }
        });

        this.calendarDays = [];
        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(this.displayedYear, this.displayedMonth, i);
          const dayName = this.weekDays[date.getDay()];

          this.calendarDays.push({
            day: i,
            dayName,
            events: reunionesPorDia[i] ?? []
          });
        }
      })
    ).subscribe();
  }

  goToRecordatorio(dia: number, mes: number) {
    const mesTexto = this.monthNames[this.displayedMonth].slice(0, 3).toUpperCase();
    this.router.navigate(['/recordatorio'], {
      queryParams: {
        dia: dia,
        mes: mesTexto
      }
    });
  }

  nextMonth() {
    if (this.displayedMonth === 11) {
      this.displayedMonth = 0;
      this.displayedYear++;
    } else {
      this.displayedMonth++;
    }
    this.generateCalendar();
  }

  prevMonth() {
    if (this.displayedMonth === 0) {
      this.displayedMonth = 11;
      this.displayedYear--;
    } else {
      this.displayedMonth--;
    }
    this.generateCalendar();
  }
}
