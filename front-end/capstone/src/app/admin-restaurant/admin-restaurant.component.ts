import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-restaurant',
  templateUrl: './admin-restaurant.component.html',
  styleUrls: ['./admin-restaurant.component.css'],
})
export class AdminRestaurantComponent implements OnInit {
  cities: any;

  active: boolean = false;

  showAddRestaurant: boolean = false;
  Restaurants: any;
  city: any = '';
  addRestaurant: any;
  rest: any;
  rName: any = '';
  rImage: any = '';
  rRating: any = '';

  Rescity: any = '';

  menu: any;
  menuCall: boolean = false;

  deleteButton: boolean = false;

  constructor(
    private form: FormBuilder,
    private admin: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.admin.getCity().subscribe({
      next:data=>{
        this.cities = data
      }
    })
  }

  addRestaurants = this.form.group({
    resName: ['', [Validators.required]],
    image: ['', Validators.required],
    rating: ['', Validators.required],
  });

  citySelection = this.form.group({
    Restaurant: ['', ''],
    location: ['', Validators.required],
  });

  resSelection = this.form.group({
    Restaurant: ['',Validators.required],
    location: ['']
  });

  get restaurant() {
    return this.addRestaurant.get('restaurant');
  }
  get password() {
    return this.addRestaurant.get('password');
  }
  get location() {
    return this.addRestaurant.get('location');
  }

  restaurants() {
    console.log('click');
    this.city = this.citySelection.value.location;
    window.localStorage.setItem('location', this.city);
    this.admin.cityRestaurants(this.city).subscribe((data) => {
      this.Restaurants = data;
      this.rName = this.Restaurants.resName;
    });
    this.snackBar.open(`Selected City:`, `${this.city}`, {
      duration: 3000,
    });
  }

  showRestaurantAdd() {
    this.active = this.rest.active;

    this.showAddRestaurant = !this.showAddRestaurant;
  }

  activeStatus() {
    this.active = !this.active;
    localStorage.setItem('city', this.Rescity);
    console.log(this.addRestaurant);
    this.admin.deleteRestaurants(this.rest).subscribe((data) => {
    });

    setTimeout(() => {
      const Restaurant = {
        resName: this.rest.resName,
        rating: this.addRestaurants.value.rating,
        image: this.rest.image,
        resCity: this.rest.resCity,
        menu: this.rest.menu,
        resMail: this.rest.resMail,
        resPassword: this.rest.resPassword,
        active: this.active,
      };
      console.log(this.addRestaurant);
      this.admin.addRestaurants(Restaurant).subscribe((data) => {
        this.snackBar.open(`Restaurant Info Updated`, "OK", {
          duration: 2000,
        });
      });
    }, 500);


  }

  updateRestaurant() {
    localStorage.setItem('city', this.Rescity);
    console.log(this.addRestaurant);
    this.admin.deleteRestaurants(this.rest).subscribe((data) => {
    });

    setTimeout(() => {
      const Restaurant = {
        resName: this.rest.resName,
        rating: this.addRestaurants.value.rating,
        image: this.rest.image,
        resCity: this.rest.resCity,
        menu: this.rest.menu,
        resMail: this.rest.resMail,
        resPassword: this.rest.resPassword,
        active: this.active,
      };
      console.log(this.addRestaurant);
      this.admin.addRestaurants(Restaurant).subscribe((data) => {
        this.snackBar.open(`Restaurant Info Updated`, "OK", {
          duration: 2000,
        });
      });
    }, 500);


  }

  editRes() {
    console.log('click');
    this.rName = this.rest.resName;
    this.rImage = this.rest.image;
    this.rRating = this.rest.rating;
    console.log(this.rest);
    this.snackBar.open(`Selected Restaurant:`, `${this.rName}`, {
      duration: 3000,
    });

    for (const res of this.Restaurants) {
      console.log(res.resName);
      if (this.rName != null) {
        if (res.resName === this.rName) {
          this.deleteButton = true;
        }
      }
    }

    this.admin.getMenuOfRes(this.rest).subscribe((data) => {
      this.menu = data;

    });
    this.menuCall = !this.menuCall;
  }
}
