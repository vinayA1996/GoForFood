import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FavoriteService } from '../services/favorite.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.css']
})
export class UserFavoriteComponent implements OnInit {

  constructor(private favorite: FavoriteService, private cart: CartService, private snackBar: MatSnackBar, private router: Router, private route:RouteService) { }

  restaurants: any;
  menu: any;
  email: any = localStorage.getItem('email');
  items: any = [];

  ngOnInit(): void {
    this.favorite.refresh$.subscribe(() => {
      this.getRestaurants();
    })
    this.getRestaurants();
    this.favorite.refresh$.subscribe(() => {
      this.getMenu();
    })
    this.getMenu();
    this.cart.getCart().subscribe({
      next:data=>{
        if( data.menu != null){
          this.items = data.menu
        }
        else{
          this.items = []
        }
        console.log(this.items)
      },
      error:err=>{
        console.log("Cart is empty");
      }
    })
  }

  private getRestaurants() {
    this.favorite.getRestaurants(this.email).subscribe({
      next: data => {
        this.restaurants = data;
      },
      error: err => {
        alert('Server Error. Try again after sometime');
      }
    })
  }

  private getMenu() {
    this.favorite.getMenu(this.email).subscribe({
      next: data => {
        this.menu = data;
        console.log(this.menu)
      },
      error: err => {
        alert('Server Error. Try again after sometime');
      }
    })
  }

  goTo(index: number) {
    window.localStorage.setItem('restaurant', this.restaurants[index].resName);
  }

  deleteRestaurant(email: string, restaurant: any) {
    this.favorite.deleteRestaurant(email, restaurant).subscribe();
  }
  deleteMenu(email: string, menu: any) {
    this.favorite.deleteMenu(email, menu).subscribe();
  }

  inputnumber = 1;

  plus(index: number) {
    let inputs = document.getElementsByName('quantity');
    if (this.inputnumber != 10) {
      this.inputnumber = this.inputnumber + 1;
      inputs[index].setAttribute('value', this.inputnumber.toString());
    }
  }
  minus(index: number) {
    let inputs = document.getElementsByName('quantity');
    if (this.inputnumber != 1) {
      this.inputnumber = this.inputnumber - 1;
      inputs[index].setAttribute('value', this.inputnumber.toString());
    }
  }


  addToCart(index: number): void {
    if (this.menu[index].resCity === localStorage.getItem('location')) {
      this.menu[index].qty = this.inputnumber;
      this.menu[index].total = parseInt(this.menu[index].price) * parseInt(this.menu[index].qty);
      this.items.push(this.menu[index]);
      this.cart.saveToCart(this.items).subscribe({
        next: data => {
          console.log(data);
        }
      })
      this.snackBar.open("Item added to cart", "OK", {
        duration: 3000
      })
    }
    else {
      alert('You cannot order from a restaurant that is not located in your current location');
    }
  }

  createCart(list: []): void {
    if (list.length == 0) {
      alert('No items added to cart.');
    }
    else {
      this.route.toCart();
    }
  }
}
