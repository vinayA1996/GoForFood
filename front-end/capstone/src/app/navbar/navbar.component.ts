import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouteService } from '../services/route.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  token:any = ''

  constructor(private auth:AuthService){}

  loginStatus$?: Observable<boolean>;

  ngOnInit(): void {
    this.loginStatus$ = this.auth.isLoggedIn;
    this.token = localStorage.getItem('token');
  }

  logout(){
    this.auth.logout();
    window.localStorage.setItem('email','');
    window.localStorage.setItem('token','');
    window.localStorage.setItem('location','');
    window.localStorage.setItem('city','');
    window.localStorage.setItem('restaurant','');
  }
}
