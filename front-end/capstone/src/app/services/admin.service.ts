import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public refresh$ = new Subject<void>();

  get refresh() {
    return this.refresh$;
  }

  resname: any;

  constructor(private http: HttpClient) {
  }

  getCity(): Observable<any> {
    return this.http.get("http://localhost:8080/city/all");
  }


  submitCity(city: any): Observable<any> {
    return this.http.post("http://localhost:8080/city/addCity", city).pipe(
      tap(() => {
        return this.refresh$.next();
      })
    );
  }

  deleteCity(city: any) {
    console.log(city);
    return this.http.delete(`http://localhost:8080/city/delete/${city}`).pipe(
      tap(() => {
        return this.refresh$.next();
      })
    );
  }

  cityRestaurants(city: any) {
    console.log(city);
    return this.http.get(`http://localhost:8080/city/allRestaurants/${city}`);
  }

  addRestaurants(restaurant: any) {

    return this.http.put(`http://localhost:8080/city/addRestaurant/${window.localStorage.getItem('location')}`, restaurant);
  }

  deleteRestaurants(restaurant: any) {

    return this.http.post(`http://localhost:8080/city/deleteRestaurant`, restaurant);
  }


  getMenuOfRes(restaurant: any) {
    // console.log(restaurant);
    this.resname = restaurant.resName;

    return this.http.get(`http://localhost:8080/city/menu/${window.localStorage.getItem('city')}/${localStorage.getItem('resName')}`);
  }

  addMenu(menu: any) {
    console.log(menu);
    return this.http.put(`http://localhost:8080/city/addMenu/${window.localStorage.getItem('city')}/${localStorage.getItem('resName')}`, menu).pipe(
      tap(() => {
        return this.refresh$.next();
      })
    );
  }


  deleteMenu(menu: any) {
    console.log(menu);
    return this.http.post(`http://localhost:8080/city/menudelete/${window.localStorage.getItem('city')}/${localStorage.getItem('resName')}`, menu).pipe(
      tap(() => {
        return this.refresh$.next();
      })
    );;
  }


}
