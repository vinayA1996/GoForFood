import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) { }

  addRestaurants(restaurant:any){
  
    return this.http.put(`http://localhost:8080/city/addRestaurant/${window.localStorage.getItem('location')}`,restaurant);
  }


  restaurantLogin(restaurant:any){
  
    return this.http.post<any>("http://localhost:8080/city/restaurnatLogin",restaurant);
  }

  
  getRestaurant(restaurant:any){
  
    return this.http.post<any>("http://localhost:8080/city/getRestaurant",restaurant);
  }
}
