import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Agenda {
  id?: string;
  motivo: string;
  hora: string;
  turno: string;
  dia: number;
  mes: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  constructor(private firestore: Firestore) {}

  getAgendasPorDiaMes(dia: number, mes: string): Observable<Agenda[]> {
    const ref = collection(this.firestore, 'agendas'); // Tu colección se llama 'agendas'
    return collectionData(ref, { idField: 'id' }).pipe(
      map((agendas: any[]) =>
        agendas.filter(a => a.dia === dia && a.mes === mes)
      )
    );
  }

  actualizarAgenda(id: string, cambios: Partial<Agenda>): Promise<void> {
    const agendaRef = doc(this.firestore, `agendas/${id}`);
    return updateDoc(agendaRef, cambios);
  }

  eliminarAgenda(id: string): Promise<void> {
    const agendaRef = doc(this.firestore, `agendas/${id}`);
    return deleteDoc(agendaRef);
  }
}
