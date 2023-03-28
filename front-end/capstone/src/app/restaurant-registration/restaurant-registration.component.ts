import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { RestaurantService } from '../services/restaurant.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './restaurant-registration.component.html',
  styleUrls: ['./restaurant-registration.component.css']
})
export class RestaurantRegistrationComponent implements OnInit {
  cites: any;

  constructor(private form: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar,
    private admin: AdminService,
    private route: RouteService, private sendmail: EmailService, private sRestaurant: RestaurantService) { }
  // private routeService: RouteServiceService

  imgUrl: string = "../../assets/res_i.jpg"
  rImage: string = "";
  city: any = '';

  citySelection = this.form.group({
    Restaurant: ['', ''],
    location: ['', Validators.required],
  });

  ngOnInit(): void {
    this.admin.getCity().subscribe(data => {
      this.cites = data;
      console.log(this.cites);

    }
    )
  }

  registrationDetails = this.form.group({
    resName: ['', Validators.required],
    location: ['', Validators.required],
    resMail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
    confirmPassword: ['', Validators.required],
    image: [''],
  })

  get resName() { return this.registrationDetails.get('resName'); }
  get resMail() { return this.registrationDetails.get('resMail'); }
  get password() { return this.registrationDetails.get('password'); }
  get confirmPassword() { return this.registrationDetails.get('confirmPassword'); }

  isSubmitted = false;
  isRegistered = false;

  restaurant: any = {
    resName: '',
    resMail: '',
    password: '',
    image: '',
  }

  registered() {

    this.city = this.registrationDetails.value.location;
    window.localStorage.setItem('location', this.city);

    const restaurant = {
      resName: this.registrationDetails.value.resName,
      resMail: this.registrationDetails.value.resMail,
      resPassword: this.registrationDetails.value.password,
      image: this.restaurant.image,
      active: false,
      menu: [],
      rating: '',
      resCity: this.registrationDetails.value.location
    }
    console.log(restaurant);
    this.admin.addRestaurants(restaurant).subscribe((data) => {
      this.snackBar.open('Restaurant Added', 'OK', {
        duration: 2000
      });
    });
    this.route.toRestaurantLogin()
  }

  uploadfile(event: any) {
    if (event.target.files) {
      let file = new FileReader();
      file.readAsDataURL(event.target.files[0]);
      file.onload = (photo: any) => {
        this.imgUrl = photo.target.result;
        console.log(photo.target.result);
        this.restaurant.image = photo.target.result;
      }
    }
    console.log(this.restaurant)
  }
}