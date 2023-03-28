import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MatToolbar } from '@angular/material/toolbar'
import { AuthService } from '../services/auth.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  showCity: boolean = false;
  showRestaurant: boolean = false;

  constructor(private admin: AdminService, private auth: AuthService, private route: RouteService) { }

  cites: any;

  logOut() {
    this.auth.logout();
    window.localStorage.setItem('email', '');
    window.localStorage.setItem('token', '');
    window.localStorage.setItem('location', '');
    window.localStorage.setItem('city', '');
    window.localStorage.setItem('restaurant', '');
    window.localStorage.setItem('role', '');
  }

}
