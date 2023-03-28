import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { MainService } from '../services/main.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  sendEmail: string="";

  hide = true;

  list:any[] = []

  allCities:string[] = []

  isSubmitted:boolean = false;

  constructor(private main:MainService, private form: FormBuilder, private auth: AuthService,private snackBar:MatSnackBar,
    private route:RouteService,private sendMail:EmailService) { }

  ngOnInit(): void {
    this.main.getCity().subscribe({
      next:data=>{
        this.list = data;
        for(let i= 0;i<this.list.length;i++){
          this.allCities.push(this.list[i].city);
          this.allCities.sort();
        }
        console.log(this.allCities);
      }
    })
  }

  loginDetails = this.form.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password: ['', Validators.required],
    location:['',Validators.required]
  })

  get email() { return this.loginDetails.get('email'); }
  get password() { return this.loginDetails.get('password'); }
  get location() { return this.loginDetails.get('location'); }

  authDetails:any;

  login() {
    this.auth.loginUser(this.loginDetails.value).subscribe({
      next: data => {
        let currentLocation = ''
        if (this.loginDetails.controls.location.value != null) {
          currentLocation = this.loginDetails.controls.location.value
        }
        setTimeout(() => {
          this.authDetails = data;
          localStorage.setItem("token", this.authDetails.token);
          localStorage.setItem("email", this.authDetails.email);
          localStorage.setItem('location', currentLocation);
          localStorage.setItem('city', currentLocation);
          localStorage.setItem('role', this.authDetails.role);
          console.log(data);
          if ( localStorage.getItem('role') === "admin") {
            this.auth.loggedIn();
            this.route.toadmin();
         
          }
          if (this.authDetails.role == "user") { 
            this.auth.login();
           
            this.route.toRestaurant(); 
            this.route.toRestaurant(); 
            this.snackBar.open('Login Successful', 'OK', {
              duration: 3000
            });
          }
        }, 3000)
      },
      error: err => {
        alert("Invalid login details. Try again");
        this.loginDetails.reset();
      }
    })
  }
  sendLink()
  {
    const customer={
      email:this.sendEmail,
      message:`Your password reset link http://localhost:4200/reset`
    }

    this.sendMail.password(customer).subscribe(
      data=>
      console.log(data)
    );

    window.alert("Your password reset link as been sent");

    this.route.toHome() 

  }

}
