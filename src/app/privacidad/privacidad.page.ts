import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './privacidad.page.html',
  styleUrls: ['./privacidad.page.scss'],
})
export class PrivacidadPage {}
