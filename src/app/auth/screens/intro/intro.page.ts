import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, IonInput, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {

  passwordVisible = false;
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private firestore: Firestore,
    private auth: Auth,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  togglePassword(input: IonInput) {
    this.passwordVisible = !this.passwordVisible;
    input.type = this.passwordVisible ? 'text' : 'password';
  }

  goToRegister() {
    this.router.navigate(['/crear-cuenta']);
  }

  async mostrarAlerta(header: string, mensaje: string) {
    const alert = await this.alertController.create({
      header,
      message: mensaje,
      buttons: ['Aceptar'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async iniciarSesion() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      await this.mostrarAlerta('Error', 'Completa todos los campos');
      return;
    }

    const { nombre, contrasena } = this.loginForm.value;

    const usuariosRef = collection(this.firestore, 'usuarios');
    const q = query(usuariosRef, where('nombre', '==', nombre));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await this.mostrarAlerta('Error', 'Usuario no encontrado');
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const data = userDoc.data();
    const correo = data['correo'];
    const rol = data['rol'] || 'usuario';

    try {
      await signInWithEmailAndPassword(this.auth, correo, contrasena);
      await this.mostrarAlerta('Bienvenido', nombre);

      if (rol === 'padre') {
        this.router.navigate(['/menu-principal-pd']);
      } else {
        this.router.navigate(['/menu-principal']);
      }

    } catch (error) {
      console.error(error);
      await this.mostrarAlerta('Error', 'Correo o contraseña incorrectos');
    }
  }

  async iniciarSesionConGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      const usuariosRef = collection(this.firestore, 'usuarios');
      const q = query(usuariosRef, where('correo', '==', user.email));
      const querySnapshot = await getDocs(q);

      let rol = 'usuario';

      if (querySnapshot.empty) {
        await addDoc(usuariosRef, {
          nombre: user.displayName || 'Sin nombre',
          correo: user.email,
          uid: user.uid,
          fechaRegistro: new Date(),
          rol: 'usuario'
        });
      } else {
        const data = querySnapshot.docs[0].data();
        rol = data['rol'] || 'usuario';
      }

      await this.mostrarAlerta('Bienvenido', user.displayName || user.email || 'Usuario');

      if (rol === 'padre') {
        this.router.navigate(['/menu-principal-pd']);
      } else {
        this.router.navigate(['/menu-principal']);
      }

    } catch (error) {
      console.error('Error en login con Google:', error);
      await this.mostrarAlerta('Error', 'Error al iniciar sesión con Google');
    }
  }
}
