import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FavoriteService } from '../services/favorite.service';
import { MainService } from '../services/main.service';
import { RouteService } from '../services/route.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit  {

  menu: any;
  
  restaurant: any = '';
  city: any = '';
  isFavorite: boolean = false;

  items: any = [];

  constructor(private main: MainService, private favorite: FavoriteService, private cart: CartService, private route: RouteService, private snackBar: MatSnackBar,private admin:AdminService) { }

  ngOnInit(): void {
    this.city = window.localStorage.getItem('city');
    this.restaurant = window.localStorage.getItem('resName');
    console.log(this.restaurant);
    this.admin.refresh$.subscribe(()=>{
      this.getMenuItems()
    })
    this.getMenuItems()
    this.main.getMenu(this.city, this.restaurant).subscribe(data => {
      this.menu = data;
    })
    // this.cart.getCart().subscribe({
    //   next: data => {
    //     this.items = data.menu
    //     console.log(this.items)
    //     console.log(this.items.length)
    //   },
    //   error: err => {
    //     console.log("Cart is empty");
    //   }
    // })
  }

  private getMenuItems(){
    this.admin.getMenuOfRes(this.restaurant).subscribe(data=>{
      this.menu = data
    })
  }

  email?: any = window.localStorage.getItem("email");

  addToFavorite(email: string, menu: any, index: number) {
    if (localStorage.getItem('email') == '') {
      alert('Login is required');
    }
    else {
      this.isFavorite = true;
      this.favorite.addMenu(email, menu).subscribe({
        next:data=>{
          console.log(data);
        }
      })
      let btns = document.getElementsByName('m-icon');
      btns[index].setAttribute('class', 'fa-heart fa-solid fa-2x');
    }
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

  item: any;
  n: string = '';
  r: string = '';

  onSearchTextChanged(menu: string) {
    this.n = menu.toLowerCase();
    if (menu === '' || !menu) {
      this.main.getMenu(this.city, this.restaurant).subscribe(data => {
        this.menu = data;
      })
    }
    else {
      this.menu = this.menu.filter((menu: any) => {
        this.r = menu.itemName.toLowerCase();
        if (this.r?.includes(this.n)) {
          return this.r;
        }
        else
          return null;
      });
    }
  }

  userOrder: any;

  isCart: boolean = false;

  addToCart(index: number): void {
    console.log(this.menu[index]);
    if (localStorage.getItem('email') != '') {
      if (localStorage.getItem('city') === localStorage.getItem('location')) {
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
        alert('This restaurant is not located in your current location');
      }
    }
    else {
      alert('Login Required');
    }
  }

  createCart(list: []): void {
    if (list.length == 0) {
      alert('No items added to cart.');
    }
    else {
      // this.cart.saveToCart(list).subscribe({
      //   next:data=>{
      //     // console.log(data);
      //   }
      // })
      this.route.toCart();
    }
  }
}
