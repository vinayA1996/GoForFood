import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private form: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar, 
    private route: RouteService,private sendmail:EmailService) { }
  // private routeService: RouteServiceService

  registrationDetails = this.form.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
    confirmPassword: ['', Validators.required],
    phoneNo: ['', [Validators.required, Validators.pattern("^[6-9]\\d{9}$")]],
    houseNo: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
    pfp: ['']
  })

  get firstName() { return this.registrationDetails.get('firstName'); }
  get lastName() { return this.registrationDetails.get('firstName'); }
  get username() { return this.registrationDetails.get('username'); }
  get email() { return this.registrationDetails.get('email'); }
  get password() { return this.registrationDetails.get('password'); }
  get confirmPassword() { return this.registrationDetails.get('confirmPassword'); }
  get phoneNo() { return this.registrationDetails.get('phoneNo'); }
  get houseNo() { return this.registrationDetails.get('houseNo'); }
  get street() { return this.registrationDetails.get('street'); }
  get city() { return this.registrationDetails.get('city'); }
  get pincode() { return this.registrationDetails.get('pincode'); }
  get pfp() { return this.registrationDetails.get("pfp"); }

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

  registered() {
    const customer={
      email:this.registrationDetails.value.email,
      message:''

    }

    this.sendmail.register(customer).subscribe(
      data=>
      console.log(data)
    );


    this.auth.register(this.user).subscribe({
      next: data => {
        console.log(this.user);
        this.snackBar.open('Registration Successful', 'OK', {
          duration: 2000
        });
      },
      error: err => {
        alert("This email id(" + this.user.email + ") is already registered");
      }
    });

  }

  imgUrl: string = "../../assets/user.png"

  uploadfile(event: any) {
    if (event.target.files) {
      let file = new FileReader();
      file.readAsDataURL(event.target.files[0]);
      file.onload = (photo: any) => {
        this.imgUrl = photo.target.result;
        console.log(photo.target.result);
        this.registrationDetails.value.pfp = photo.target.result;
        this.user.image = this.registrationDetails.value.pfp;
      }
    }
    console.log(this.user)
  }
}
