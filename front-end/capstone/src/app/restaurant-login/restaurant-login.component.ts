import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { RestaurantService } from '../services/restaurant.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-restaurant-login',
  templateUrl: './restaurant-login.component.html',
  styleUrls: ['./restaurant-login.component.css']
})
export class RestaurantLoginComponent implements OnInit {

  Restaurant:any ;
  
  showAddRestaurant: boolean = false;
  Restaurants: any;
  city: any = '';
  addRestaurant: any;
  rest: any;
  rName: any = '';
  rImage: any = '';
  rRating: any = '';

  Rescity: any = '';


  hide = true;
  cites: any;
  
  constructor(
    private form: FormBuilder,
    private admin: AdminService,
    private snackBar: MatSnackBar,
    private sRestaurant:RestaurantService,
    private route:RouteService,
    private auth: AuthService
  ) {}
  
  ngOnInit(): void {
    this.admin.getCity().subscribe(data => {
      this.cites = data;
      console.log(this.cites);
    }
    )
  }

  resLogin = this.form.group({
    resMail: ['', Validators.required],
    resCity: ['', Validators.required],
    resPassword: ['', Validators.required]
  });

  
  get resMail() { return this.resLogin.get('resMail'); }
  get resPassword() { return this.resLogin.get('resPassword'); }
  get location() { return this.resLogin.get('resCity'); }

  Rlogin(){
    console.log("click");
   
    
    this.sRestaurant.restaurantLogin(this.resLogin.value).subscribe({next:data => {console.log(data),
      this.Restaurant=data,
      localStorage.setItem("resMail", data.resMail);
      localStorage.setItem('city', data.resCity);
      localStorage.setItem('resName', data.resName);
      this.snackBar.open("Login success",'ok',{
        duration: 3000
      })
      this.route.toRestaurantDashboard(); 
    },error: err => {
      alert("Invalid login details. Try again");
    }
      }
    );



  }
}
