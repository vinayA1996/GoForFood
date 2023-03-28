import { Component, OnInit,Input } from '@angular/core';
import { City } from '../model/city';
import { MainService } from '../services/main.service';
// @ts-ignore
import Typewriter from 't-writer.js'
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private main:MainService,private route:RouteService){}

  cities:City[] = []

  // @Input()
  // city?:City;

  ngOnInit():void{
    this.main.getCity().subscribe({
      next: data=>{
        this.cities = data;
        this.cities.sort((a,b) => (a.city > b.city) ? 1 : ((b.city> a.city) ? -1 : 0))
        console.log(this.cities);
      }
    })
    if(localStorage.getItem('role') === 'admin'){
      this.route.toadmin()
    }
    const span = document.querySelector('.span')
    const writer = new Typewriter(span,{
      loop: true,
      typeSpeed: 80,
      deleteSpeed: 80,
      typeColor: 'white'
    })

     writer
      .type('Hungry ?')
      .rest(500)
      .changeOps({ deleteSpeed: 20 })
      .remove(50)
      .type('Tired ?')
      .rest(500)
      .changeOps({ deleteSpeed: 20 })
      .remove(20)
      .type("Don't want to cook ?")
      .rest(500)
      .changeOps({ deleteSpeed: 20 })
      .rest(500)
      .clear()
      .start()
  }

  goTo(index:number){
    window.localStorage.setItem('city', this.cities[index].city);
  }
}
