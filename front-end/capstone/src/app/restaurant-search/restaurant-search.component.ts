import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.css']
})
export class RestaurantSearchComponent {
  searchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  searchRestaurant() {
    this.searchTextChanged.emit(this.searchValue);
  }

  clearSearch() {
    this.searchValue = "";
    this.searchTextChanged.emit(this.searchValue);
  }
}
