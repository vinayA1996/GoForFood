import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../services/admin.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-admin-cites',
  templateUrl: './admin-cites.component.html',
  styleUrls: ['./admin-cites.component.css']
})
export class AdminCitesComponent implements OnInit {

  addCity: boolean = false;

  // @Input()
  cites: any;

  constructor(private form: FormBuilder, private admin: AdminService, private route: RouteService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.admin.refresh$.subscribe(()=>{
      this.citesFuntion()
    })
    this.citesFuntion()
  }

  img: any;
  cityDetails = this.form.group({
    city: ['', [Validators.required,]],
    image: ['', Validators.required],
    // restaurantList:['',Validators.required]
  })

  cityRes: any;
  city: any;

  submitCity() {
    this.cityRes = {
      city: this.cityDetails.value.city,
      image: this.cityDetails.value.image,
      restaurantList: []
    }
    console.log(this.cityRes);
    this.admin.submitCity(this.cityRes).subscribe({
      next: data => {
        this.snackbar.open('City Added', 'OK', {
          duration: 2000
        });
      }, error: err => {
        alert("city already exists")
      }
    }
    )
    this.route.toadmin();
  }

  deletecity(city: any) {
    console.log(city);
    this.admin.deleteCity(city).subscribe()
    this.snackbar.open('City Deleted', 'OK', {
      duration: 2000
    });
  }

  showCityAdd() {
    this.addCity = !this.addCity;
  }

  private citesFuntion() {
    this.admin.getCity().subscribe(data => {
      this.cites = data;
      console.log(this.cites);
    }
    )
  }

}
