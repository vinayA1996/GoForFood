import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  toHomePage() {
    throw new Error('Method not implemented.');
  }

  constructor(private router : Router) { }

  toHome(){
    this.router.navigateByUrl('/home');
  }

  toRestaurant(){
    this.router.navigateByUrl('/restaurants')
  }

  toFavorites(){
    this.router.navigateByUrl('/favorites')
  }

  toCart(){
    this.router.navigateByUrl('/cart')
  }

  toConfirmation(){
    this.router.navigateByUrl('/confirmed')
  }

  toViewOrders(){
    this.router.navigateByUrl('/myOrders')
  }
  toadmin(){
    this.router.navigateByUrl('/admin')
  }

  toRestaurantDashboard(){
    this.router.navigateByUrl('/rdashboard')
  }

  toRestaurantLogin(){
    this.router.navigateByUrl('/rlogin')
  }
}
