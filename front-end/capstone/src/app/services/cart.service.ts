import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public refresh$ = new Subject<void>();
  
  get refresh(){
      return this.refresh$;
  }

  constructor(private http:HttpClient) { }
  
  userOrder:any = {}

  saveToCart(list:any){
    this.userOrder = {
      email:localStorage.getItem('email'),
      menu:list
    }
    return this.http.post<any>('http://localhost:9000/order/add',this.userOrder);
  }

  getCart():Observable<any>{
    return this.http.get(`http://localhost:9000/order/get/${localStorage.getItem('email')}`);
  }

  deleteItem(email:any,item:any){
    return this.http.post(`http://localhost:9000/order/deleteItem/${email}`,item).pipe(
      tap(()=>{
        return this.refresh$.next();
      }) 
    );
  }

  clearCart(email:any){
    return this.http.delete(`http://localhost:9000/order/clearCart/${email}`)
  }

  confirmOrder(order:any){
    return this.http.post<any>('http://localhost:9000/order/placed',order);
  }

  getCurrentOrder():Observable<any>{
    return this.http.get(`http://localhost:9000/order/currentOrder/${localStorage.getItem('email')}`);
  }

  viewOrders():Observable<any>{
    return this.http.get(`http://localhost:9000/order/getOrders/${localStorage.getItem('email')}`);
  }

}
