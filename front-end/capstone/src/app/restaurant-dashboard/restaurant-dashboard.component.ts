import { Component, Input } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css']
})
export class RestaurantDashboardComponent {
  active: boolean = true;

  constructor(
   private restaurantService: RestaurantService,
    private adminService: AdminService
  ){}

  resDAta:any = {};
    menu:any;

ngOnInit() {

 const Restaurant={
  resMail:localStorage.getItem('resMail'),
  resCity:localStorage.getItem('city')
 }
 this.restaurantService.getRestaurant(Restaurant).subscribe(
  data=>{ console.log(data),
    this.resDAta=data
   this.active= this.resDAta.active 
  }
 );
 this.adminService.getMenuOfRes(this.resDAta).subscribe((data) => {
  this.menu = data;
  // console.log(data);
});

}
logOut(){
  window.localStorage.setItem('email','');
  window.localStorage.setItem('token','');
  window.localStorage.setItem('location','');
  window.localStorage.setItem('city','');
  window.localStorage.setItem('restaurant','');
  window.localStorage.setItem('role','');
}
}

