import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(user:any){
    return this.http.post<any>("http://localhost:8080/customer/register",user,{responseType:'text' as 'json'});
  }

  loginUser(user:any){
    return this.http.post<any>("http://localhost:8085/user/login",user);
  }
  reset(user:any){
    return this.http.post<any>("http://localhost:8085/user/update",user);
  }

  getUserDetails():Observable<any>{
    return this.http.get(`http://localhost:8080/customer/getUser/${localStorage.getItem('email')}`);
  }

  editUserDetails(user:any){
    return this.http.put(`http://localhost:8080/customer/editUser/${localStorage.getItem('email')}`,user);
  }

  checkLoginStatus:boolean = false;

  status(){
    if(localStorage.getItem('email') == ''){
      this.checkLoginStatus = false;
    }
    else{
      this.checkLoginStatus = true;
    }
    return this.checkLoginStatus;
  }

  public loginStatus = new BehaviorSubject<boolean>(this.status());

  get isLoggedIn(){
    return this.loginStatus.asObservable(); 
  }

  login(){
      this.loginStatus.next(true);
  }

  logout(){
    this.loginStatus.next(false);
    window.localStorage.setItem("token","");
    window.localStorage.setItem("email","");
  }
  isAdmin: boolean = false;

  admin() {
    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
    return this.isAdmin;
  }

  public adminLogin = new BehaviorSubject<boolean>(this.admin());

  get isAdminLogin() {
    return this.adminLogin.asObservable();
  }

  loggedIn() {
    this.adminLogin.next(true);
  }
}
