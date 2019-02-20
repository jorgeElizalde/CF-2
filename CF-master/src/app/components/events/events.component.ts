import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireServiceService } from '../../services/fire-service.service';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
    
    formulario: FormGroup;
    eventos = [];

  constructor(private _fs: FireServiceService, private auth: AuthService) {
    this.formulario = new FormGroup({
      'uid': new FormControl(this.auth.user.uid),
      'nombre': new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'organizador': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'fechaRegfrom': new FormControl('', Validators.required),
      'fechaRegto': new FormControl('', Validators.required),
      'fechaEvfrom': new FormControl('', Validators.required),
      'fechaEvto': new FormControl('', Validators.required),
      'categories': new FormControl(''),
      'price': new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      'direction': new FormControl('', Validators.required),
      'contact': new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      'desc': new FormControl('')
    })
    this._fs.getUserEvents(this.auth.user.uid).subscribe(res => {
      this.eventos = res;
    })
   }

  ngOnInit() {
  }

  saveEvent() {
    this._fs.createEvent(this.formulario.value)
      .then( res => {
        console.log(res);
      })
      .catch(err => console.error(err))
    document.getElementById('eventModal').click();
    this.formulario.reset();
    
  }

}
