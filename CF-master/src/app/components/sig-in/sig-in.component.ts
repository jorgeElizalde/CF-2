import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})
export class SigInComponent implements OnInit {
  data: FormGroup;
  recover: FormGroup;
  constructor(private auth: AuthService) {
    this.data = new FormGroup({
      'email': new FormControl('', Validators.required),
      'pass': new FormControl()
    });
    this.recover = new FormGroup({
      'email': new FormControl('', Validators.required)
    })
   }

  ngOnInit() {
  }

  login(){
    this.auth.login(this.data.value);
    this.data.reset();
  }

  recoveryPass() {
    this.auth.recoveryPass(this.recover.value);
    document.getElementById('recoveryPass').click();
    this.recover.reset();
  }
}
