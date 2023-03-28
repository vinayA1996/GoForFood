import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurants: any;
  city: any = '';
  currentLocation: any = '';
  isFavorite: boolean = false;

  constructor(private main: MainService, private favorite: FavoriteService) { }

  ngOnInit(): void {
    this.city = window.localStorage.getItem('city');
    this.main.getRestaurant(this.city).subscribe(data => {
      this.restaurants = data;
      console.log(this.restaurants);
    })
  }

  goTo(index: number) {
    window.localStorage.setItem('restaurant', this.restaurants[index].resName);
  }

  email?: any = window.localStorage.getItem("email");

  addToFavorite(email: string, restaurant: any,index:number) {
    if (localStorage.getItem('email') == '') {
      alert('Login is required');
    }
    else {
      this.isFavorite = true;
      this.favorite.addRestaurant(email, restaurant).subscribe();
      let btns = document.getElementsByName('r-icon');
      btns[index].setAttribute('class','fa-heart fa-solid fa-2x');
    }
  }

  restaurant:any;
  n:string = '';
  r:string = '';

  onSearchTextChanged(restaurant: string) {
    this.n = restaurant.toLowerCase();
    if (restaurant === '' || !restaurant) {
      this.main.getRestaurant(this.city).subscribe(data => {
        this.restaurants = data;
      })
    }
    else {
      this.restaurants = this.restaurants.filter((rest: any) =>{
        this.r = rest.resName.toLowerCase();
        if(this.r?.startsWith(this.n)){
          return this.r;
        }
        else  
          return null;
      });
    }
  }

}
