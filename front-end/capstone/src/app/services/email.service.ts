import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }


  register(user:any){

    const customer={
      email:user.email,
      message:user.message
    }

    console.log(customer);
    return this.http.post<any>("http://localhost:9191/mail/sendmail",customer);
  }

  order(user:any){

    const customer={
      email:user.email,
      message:user.message
    }

    console.log(customer);
    return this.http.post<any>("http://localhost:9191/mail/sendordermail",customer);
  }
  password(user:any){

    const customer={
      email:user.email,
      message:user.message
    }

    console.log(customer);
    return this.http.post<any>("http://localhost:9191/mail/sendresetrmail",customer);
  }



}
