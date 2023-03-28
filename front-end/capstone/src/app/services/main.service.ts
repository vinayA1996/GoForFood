import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { }

  getCity():Observable<any>{
    return this.http.get("http://localhost:8080/city/all");
  }

  getRestaurant(city?:string):Observable<any>{
    return this.http.get(`http://localhost:8080/city/allRestaurants/${city}`);
  }

  getMenu(city?:string,restaurant?:string):Observable<any>{
    return this.http.get(`http://localhost:8080/city/menu/${city}/${restaurant}`);
  }
}
