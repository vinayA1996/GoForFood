import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) { }

  public refresh$ = new Subject<void>();
  
  get refresh(){
      return this.refresh$;
  }

  obj: any;

  addRestaurant(email: string, restaurant: any) {
    this.obj = {
      email: email,
      restaurant: restaurant
    }
    return this.http.post<any>(`http://localhost:8080/customer/favorite`, this.obj);
  }

  getRestaurants(email: string): Observable<any> {
    return this.http.get(`http://localhost:9595/favorite/restaurants/${email}`);
  }

  deleteRestaurant(email: string, restaurant: any){
    return this.http.post(`http://localhost:9595/favorite/removeRestaurant/${email}`,restaurant).pipe(
      tap(()=>{
        return this.refresh$.next();
      }) 
    );
  }

  object:any

  addMenu(email: string, menu: any) {
    this.object = {
      email: email,
      menu: menu
    }
    return this.http.post<any>(`http://localhost:8080/customer/favorite`, this.object);
  }

  getMenu(email: string): Observable<any> {
    return this.http.get(`http://localhost:9595/favorite/menu/${email}`);
  }

  deleteMenu(email: string, menu: any){
    return this.http.post(`http://localhost:9595/favorite/removeMenu/${email}`,menu).pipe(
      tap(()=>{
        return this.refresh$.next();
      }) 
    );
  }
}
