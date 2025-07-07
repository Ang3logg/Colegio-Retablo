import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario-pd',
  standalone: false,
  templateUrl: './calendario-pd.page.html',
  styleUrls: ['./calendario-pd.page.scss'],
})
export class CalendarioPdPage {
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

  constructor(private router: Router) {
    const now = new Date();
    this.displayedMonth = now.getMonth();
    this.displayedYear = now.getFullYear();
    this.generateCalendar();
  }

  generateCalendar() {
    const daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate();
    this.calendarDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.displayedYear, this.displayedMonth, i);
      const dayName = this.weekDays[date.getDay()];

      this.calendarDays.push({
        day: i,
        dayName,
        events:
          i === 13
            ? [{ titulo: 'Reunión', hora: '3:00 PM' }]
            : i === 14
            ? [
                { titulo: 'Actualizar app', hora: '9:00 AM' },
                { titulo: 'Reunión', hora: '10:00 AM' },
              ]
            : i === 15
            ? [{ titulo: 'Actualizar sitio web', hora: '3:00 PM' }]
            : [],
      });
    }
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
