import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
 
  constructor(private auth:AuthService){}

  loginStatus$?: Observable<boolean>;

  @Output() onToggleSideNav:EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;

  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
    }
  }

  img:any;

  ngOnInit(): void {
    this.loginStatus$ = this.auth.isLoggedIn;
    this.screenWidth = window.innerWidth
    this.auth.getUserDetails().subscribe(
      data=>{
        this.user = data;
        this.img = this.user.image
        console.log(this.user);
      }
    )
  }

  user:any;

  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
  }

  toMain():void{
    document.getElementById('phrase')?.scrollIntoView({behavior:'smooth'});
  }

  toContent():void{
     document.getElementById('content')?.scrollIntoView({behavior:'smooth'})
  }

  toFooter():void{
    document.getElementById('footer')?.scrollIntoView({behavior:'smooth'})
  }

  closeSidenav():void{
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
  }

  logout(){
    this.auth.logout();
    window.localStorage.setItem('email','');
    window.localStorage.setItem('token','');
    window.localStorage.setItem('location','');
    window.localStorage.setItem('city','');
    window.localStorage.setItem('restaurant','');
    window.localStorage.setItem('role','');
  }
}
