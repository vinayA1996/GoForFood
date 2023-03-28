import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  menu: any;

  resName = localStorage.getItem('resName');

  ngOnInit(): void {
    console.log(this.resName);
    this.admin.refresh$.subscribe(()=>{
      this.getMenuItems()
    })
    this.getMenuItems()
  }

  private getMenuItems(){
    this.admin.getMenuOfRes(this.resName).subscribe(data=>{
      this.menu = data
    })
  }

  restMenu: any;

  mName: any;
  mImage: any;
  mPrice: any
  mCategory: any;
  mQty: any;
  mCuisine: any;

  showMenu: boolean = false;

  constructor(private form: FormBuilder, private admin: AdminService,private snackBar:MatSnackBar) { }

  addMenu = this.form.group(
    {
      itemName: ['', [Validators.required]],
      image: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      cuisine: ['', Validators.required],
      qty: ['',]
    }
  )

  addedmenu: any = {};

  resSelection = this.form.group
    ({
      Restaurant: ['',Validators.required],
      location: ['']
    })


  // editMenu() { }

  submitMenu() {
    this.addedmenu = {
      itemName: this.addMenu.value.itemName,
      image: this.addMenu.value.image,
      category: this.addMenu.value.category,
      price: this.addMenu.value.price,
      resCity: window.localStorage.getItem('city'),
      resName: this.resName,
      cuisine: this.addMenu.value.cuisine,
      qty: this.addMenu.value.qty,
    }
    this.admin.addMenu(this.addedmenu).subscribe({
      next: data => {
        this.snackBar.open('Menu Item Added', 'OK', {
          duration: 2000
        });
      }, error: err => {
        alert("Menu already exists")
      }
    });

    this.addMenu.reset();
    this.showMenu = !this.showMenu;
  }

  show:boolean = false;

  showMenuAdd() {
    this.addMenu.reset()
    this.show = true
    this.showMenu = !this.showMenu;
  }

  showMenuEdit() {
    if(this.show){
      this.show = false
    }
    this.showMenu = !this.showMenu;
  }

  editM() {
    this.mName = this.restMenu.itemName;
    this.mImage = this.restMenu.image;
    this.mCategory = this.restMenu.category;
    this.mPrice = this.restMenu.price;
    this.mCuisine = this.restMenu.cuisine;
    this.mQty = this.restMenu.qty;
  }

  deleteMenu() {
    this.addedmenu = {
      itemName: this.addMenu.value.itemName,
      image: this.addMenu.value.image,
      category: this.addMenu.value.category,
      price: this.addMenu.value.price,
      resCity: window.localStorage.getItem('city'),
      resName: this.resName,
      cuisine: this.addMenu.value.cuisine,
      qty: this.addMenu.value.qty,
    }

    this.admin.deleteMenu(this.addedmenu).subscribe({
      next: data => {
        this.snackBar.open('Menu Item Deleted', 'OK', {
          duration: 2000
        });
      }
    });
    this.addMenu.reset();
    this.resSelection.reset();
    this.showMenu = !this.showMenu;
  }


  editMenuSave() {
    console.log(this.restMenu);

    this.admin.deleteMenu(this.restMenu).subscribe();

    const updatemenu = {
      itemName: this.addMenu.value.itemName,
      image: this.addMenu.value.image,
      category: this.addMenu.value.category,
      price: this.addMenu.value.price,
      resCity: window.localStorage.getItem('city'),
      resName: this.resName,
      cuisine: this.addMenu.value.cuisine,
      qty: this.addMenu.value.qty,
    }

    this.resSelection.reset();
    
    setTimeout(() => {
      this.admin.addMenu(updatemenu).subscribe({
        next: data => {
          this.snackBar.open('Item Details Updated', 'OK', {
            duration: 2000
          });
        }
      });
    }, 160)
  }
}
