import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';
import { UserRestaurantsComponent } from './user-restaurants/user-restaurants.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatToolbarModule  } from'@angular/material/toolbar';
import { AdminCitesComponent } from './admin-cites/admin-cites.component';
import { AdminRestaurantComponent } from './admin-restaurant/admin-restaurant.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ResetComponent } from './reset/reset.component';
import { RestaurantLoginComponent } from './restaurant-login/restaurant-login.component';
import { RestaurantRegistrationComponent } from './restaurant-registration/restaurant-registration.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RestaurantComponent,
    MenuComponent,
    UserFavoriteComponent,
    UserRestaurantsComponent,
    SidenavComponent,
    BodyComponent,
    FooterComponent,
    RestaurantSearchComponent,
    CartComponent,
    OrderConfirmedComponent,
    UserOrdersComponent,
    UserProfileComponent,
    NotFoundComponent,
    AdminDashboardComponent,
    AdminCitesComponent,
    AdminRestaurantComponent,
    AdminMenuComponent,
    ResetComponent,
    RestaurantLoginComponent,
    RestaurantRegistrationComponent,
    RestaurantDashboardComponent,
    RestaurantMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    HttpClientModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
