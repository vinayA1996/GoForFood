import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private auth:AuthService,private snackBar:MatSnackBar){}

  user: any = {
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    address: {
      houseNo:'',
      street:'',
      city:'',
      pinCode:'',
    },
    image:'',
    role: 'user'
  }



  ngOnInit(): void {
    this.auth.getUserDetails().subscribe(
      data=>{
        this.user = data;
        console.log(this.user)
      }
    )
  }

  profile = {
      username: '',
      email: '',
      password: '',
      phoneNo:'',
      address:{
        houseNo:'',
        street:'',
        city:'',
        pinCode:''
      },
      image:'',
      role: 'user'
    }

  saveChanges(form:NgForm){
    this.profile = {
      username: form.value.username,
      email: '',
      password: '',
      phoneNo:form.value.phoneNo,
      address:{
        houseNo:form.value.houseNo,
        street:form.value.street,
        city:form.value.city,
        pinCode:form.value.pincode
      },
      image:this.img,
      role: 'user'
    }
    console.log(this.profile);
    this.auth.editUserDetails(this.profile).subscribe({
      next:data=>{
        if(!form.invalid){
          this.snackBar.open('Profile Updated', 'OK', {​
            duration: 2000​
           });
        }
       window.location.reload()
      },
      error:err=>{
        alert('Error updating profile.')
      }
    })
  }

  img = this.user.image;

  uploadfile(event: any) {
    if (event.target.files) {
      let file = new FileReader();
      file.readAsDataURL(event.target.files[0]);
      file.onload = (photo: any) => {
        console.log(photo.target.result);
        this.user.image = photo.target.result;
        this.img = photo.target.result;
      }
    }
    console.log(this.profile);
  }

}
