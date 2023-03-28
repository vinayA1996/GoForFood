import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { MainService } from '../services/main.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  constructor(private form: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar, 
    private route: RouteService,private sendmail:EmailService) { }
  // private routeService: RouteServiceService

  registrationDetails = this.form.group({
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
    confirmPassword: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  })

  get email() { return this.registrationDetails.get('email'); }
  get password() { return this.registrationDetails.get('password'); }
  get confirmPassword() { return this.registrationDetails.get('confirmPassword'); }


  isSubmitted = false;
  isRegistered = false;

  user: any = {
    firstName:'',
    lastName:'',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    address: {
      houseNo: '',
      street: '',
      city: '',
      pinCode: '',
    },
    image:'',
    role: 'user'
  }


  reset(){

    const userUpdate={

      email: this.registrationDetails.value.email,
      password: this.user.password, 

    }

    window.alert("Password Updated Successfully");
    this.route.toHome();
    
    this.auth.reset(userUpdate).subscribe()



  }

}
