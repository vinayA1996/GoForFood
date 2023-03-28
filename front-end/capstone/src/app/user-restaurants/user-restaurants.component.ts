import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-user-restaurants',
  templateUrl: './user-restaurants.component.html',
  styleUrls: ['./user-restaurants.component.css']
})
export class UserRestaurantsComponent implements OnInit {

  restaurants: any;
  currentLocation: any = '';
  isFavorite: boolean = false;

  constructor(private main: MainService, private favorite:FavoriteService){}

  ngOnInit(): void {
    this.currentLocation = localStorage.getItem('location');
    this.main.getRestaurant(this.currentLocation).subscribe(data => {
      this.restaurants = data;
    })
  }

  goTo(index: number) {
    window.localStorage.setItem('restaurant', this.restaurants[index].resName);
  }

  email?: any = window.localStorage.getItem("email");

  addToFavorite(email: string, restaurant: any,index:number) {
      this.isFavorite = true;
      this.favorite.addRestaurant(email, restaurant).subscribe();
      console.log('added');
      let btns = document.getElementsByName('ur-icon');
      btns[index].setAttribute('class','fa-heart fa-solid fa-2x');
  }

  restaurant:any;
  n:string = '';
  r:string = '';

  onSearchTextChanged(restaurant: string) {
    this.n = restaurant.toLowerCase();
    if (restaurant === '' || !restaurant) {
      this.main.getRestaurant(this.currentLocation).subscribe(data => {
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
