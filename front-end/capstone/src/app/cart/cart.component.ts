import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { EmailService } from '../services/email.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cart: CartService, private route: RouteService, private location: Location,private sendmail:EmailService) { }

  items: any = [];
  amount: number = 0;

  ngOnInit(): void {
    this.cart.refresh$.subscribe(() => {
      this.getItems();
    })
    this.getItems();
    console.log(this.items)
  }

  flag: boolean = false

  private getItems() {
    this.cart.getCart().subscribe({
      next: data => {
        this.items = data.menu;
        let itemTotal = 0;
        let totalAmount = 0;
        for (let i = 0; i < this.items.length; i++) {
          itemTotal = this.items[i].price * this.items[i].qty
          totalAmount += itemTotal;
        }
        this.amount = totalAmount
      },
      error: err => {
        this.route.toHome()
      }
    }
    )
  }

  email = localStorage.getItem('email');

  deleteItem(email: any, item: any) {
    this.cart.deleteItem(email, item).subscribe();
    setTimeout(() => {
      const items = document.getElementsByClassName('calculation');
      if (items.length == 0) {
        this.location.back()
      }
    }, 500)
  }

  orderDetails: any;

  date(): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date();
    let d = date.getDate();
    let day = (d > 9 ? '' : '0') + d;
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear().toString();
    let currentDate = day + " " + month.toString() + " " + year;
    return currentDate;
  }

  time(): string {
    let time = new Date();
    let currentOffset = time.getTimezoneOffset();
    let ISTOffset = 330;
    let ISTTime = new Date(time.getTime() + (ISTOffset + currentOffset) * 60000);
    let hours = ISTTime.getHours()
    let minutes = ISTTime.getMinutes()
    let currentTime = ''
    if (hours > 11 && minutes > 0) {
      currentTime = hours + ":" + minutes + ' PM'
    }
    else {
      currentTime = hours + ":" + minutes + ' AM'
    }
    return currentTime;
  }


  confirmOrder(items: [], amount: any) {
    this.orderDetails = {
      email: localStorage.getItem('email'),

      orderList: [{
        orderId: this.generateRandomString(5),
        menu: this.items,
        dateOfOrder: this.date(),
        timeOfOrder: this.time(),
        noOfItems: this.items.length,
        amount: this.amount,
      }]
      
    }
    const customer={
      email: localStorage.getItem('email'),
      message: ` \nYour Order Of ₹${amount}\nwith order Id:${this.orderDetails.orderList[0].orderId} has been confirmed\non date: ${this.orderDetails.orderList[0].dateOfOrder} and time: ${this.orderDetails.orderList[0 ].timeOfOrder}
      Thanks for Ordering Have a Great Food Journey!`,  
    }

    this.sendmail.order(customer).subscribe();
    console.log(this.orderDetails)
    this.cart.confirmOrder(this.orderDetails).subscribe();

    window.setTimeout(() => {
      this.route.toConfirmation();
    }, 1000)
    
  }

  generateRandomString(n: any): string {
    let randomString = '';
    let a = '';
    let b = '';

    let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < n; i++) {
      a += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    }

    let numbers = '0123456789';

    for (let i = 0; i < n; i++) {
      b += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    randomString = b + a;

    return randomString;
  }

  inputnumber = 1;

  plus(index: number) {
    let inputs = document.getElementsByName('quantity');
    let q = parseInt(this.items[index].qty);
    if (q > 0 && q < 10) {
      q += 1
      this.items[index].qty = q.toString();
      inputs[index].setAttribute('value', this.items[index].qty);
      this.items[index].total = this.items[index].price * this.items[index].qty
      this.amount = 0
      for (let i = 0; i < this.items.length; i++) {
        console.log(this.items[i].total)

        this.amount += this.items[i].total
      }
    }
  }
  minus(index: number) {
    let inputs = document.getElementsByName('quantity');
    let q = parseInt(this.items[index].qty);
    if (q > 1 && q <= 10) {
      q -= 1
      this.items[index].qty = q.toString();
      inputs[index].setAttribute('value', this.items[index].qty);
      this.items[index].total = this.items[index].price * this.items[index].qty
      this.amount = 0
      for (let i = 0; i < this.items.length; i++) {
        console.log(this.items[i].total)
        this.amount += this.items[i].total
      }
    }
  }
}
