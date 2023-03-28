import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit{

  constructor(private cart:CartService){}

  panelOpenState = false;
  
  orders:any;

  ngOnInit(): void {
    this.cart.viewOrders().subscribe(
      data=>{
        this.orders = data;
        console.log(this.orders);
      }
    )
  }

  total(index:any){
    return parseInt(this.orders[index].amount) + 50;
  }

}
