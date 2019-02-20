import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor( private auth: AuthService, private router: Router) { }

  canActivate() {
    if( this.auth.user.uid) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
