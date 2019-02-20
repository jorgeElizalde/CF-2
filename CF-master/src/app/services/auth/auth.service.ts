import { Injectable, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = {};
  constructor( private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(data => {
      // console.log(data);
      if (!data){
          return;
      }else{
        this.user.uid = data.uid;
      }
    })
  
  }

  signup(email, password) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
      })
  }

  login(provider) {
    console.log(provider);
    if (provider === 'google' || provider.pass === null && provider.email === null) {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then( res => {
          this.router.navigate(['/home'])
        }, err => {
          console.log(err);
        })
    }else {
      this.afAuth.auth.signInWithEmailAndPassword(provider.email, provider.pass)
        .then( res => {
          this.router.navigate(['/home'])
        }, err => {
          console.log(err);
          if(err.code === "auth/user-not-found") {
            console.log('No se encontro usuario');
          } if ( err.code === "auth/wrong-password" || err.code === "auth/invalid-email") {
            console.log('Usuario o Contraseña incorrectos');
          }
        })
    }
  }
  logout() {
    this.user = {};
    this.afAuth.auth.signOut();
    this.router.navigate(['/home']);
  }

  recoveryPass(data) {
    this.afAuth.auth.sendPasswordResetEmail(data.email)
      .then( () => this.router.navigate(['/login']))
      .catch( (err) => console.error('Ocurrio un error', err))
  }
}
