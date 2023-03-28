import { Component,OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.css']
})
export class OrderConfirmedComponent implements OnInit {

  currentOrder:any;
  user:any;

  delivery = 50;

  total = 0;

constructor(private auth:AuthService, private cart:CartService,private route:RouteService){}

  ngOnInit():void{
    this.cart.clearCart(localStorage.getItem('email')).subscribe();
    this.cart.getCurrentOrder().subscribe(
      data=>{
        this.currentOrder = data;
        this.total = parseInt(this.currentOrder.amount) + this.delivery;
        console.log(this.currentOrder);
      }
    )
    this.auth.getUserDetails().subscribe(
      data=>{
        this.user = data
        console.log(this.user);
      }
    )
  }

  isDisplayed = false;

  email = localStorage.getItem('email');

  display(){
    this.isDisplayed = true;
  }

  toOrders(){
    this.route.toViewOrders();
  }
}
