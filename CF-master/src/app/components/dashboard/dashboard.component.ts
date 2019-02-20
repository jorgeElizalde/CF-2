import { Component, OnInit } from '@angular/core';
import { FireServiceService } from '../../services/fire-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allevents=[];
  constructor(private _fs: FireServiceService) { 
    this._fs.cargarEventos()
        .subscribe( res => {
         this.allevents = res;
        });
  }

  ngOnInit() {
    var navClass = 'fixed';
    const navBar = document.getElementById('header');
    window.onscroll = function() {myFunction()};

    function myFunction() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navBar.className = navClass;
        console.log("");
      } else {
        navBar.className = '';
      }
    }
  }

}
