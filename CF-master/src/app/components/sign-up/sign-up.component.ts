import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser: FormGroup;
  constructor(private router: Router, private auth: AuthService) {
    this.newUser = new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(5), Validators.maxLength(50)]),
      'correo': new FormControl('',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'contrasena': new FormControl('',[Validators.required, Validators.minLength(5)])
    })
   }

  ngOnInit() {
  }

  createAccount() {
    console.log(this.newUser.value);
    localStorage.setItem('userName', this.newUser.value.nombre);
    this.auth.signup(this.newUser.value.correo, this.newUser.value.contrasena);
  }

  signupWGoogle() {
    this.auth.login('google');
  }
}
