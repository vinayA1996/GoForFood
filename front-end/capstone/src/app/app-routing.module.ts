import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantLoginComponent } from './restaurant-login/restaurant-login.component';
import { RestaurantRegistrationComponent } from './restaurant-registration/restaurant-registration.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AdminGuardGuard } from './services/admin-guard.guard';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRestaurantsComponent } from './user-restaurants/user-restaurants.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'home/:city/restaurants',component:RestaurantComponent},
  {path:'home/:city/restaurants/:restaurant/menu',component:MenuComponent},
  {path:'cities',component:HomeComponent},
  {path:'cities/:city/restaurants',component:RestaurantComponent},
  {path:'cities/:city/restaurants/:restaurant/menu',component:MenuComponent},
  {path:'about',component:HomeComponent},
  {path:'about/:city/restaurants',component:RestaurantComponent},
  {path:'about/:city/restaurants/:restaurant/menu',component:MenuComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:':city/restaurants',component:RestaurantComponent},
  {path:':city/restaurants/:restaurant/menu',component:MenuComponent},
  {path:'restaurants',component:UserRestaurantsComponent,canActivate:[AuthGuardGuard]},
  {path:'restaurants/:restaurant/menu',component:MenuComponent},
  {path:'favorites',component:UserFavoriteComponent,canActivate:[AuthGuardGuard]},
  {path:'favorites/:restaurant/menu',component:MenuComponent,canActivate:[AuthGuardGuard]},
  {path:'cart',component:CartComponent,canActivate:[AuthGuardGuard]},
  {path:'confirmed',component:OrderConfirmedComponent,canActivate:[AuthGuardGuard]},
  {path:'myOrders',component:UserOrdersComponent,canActivate:[AuthGuardGuard]},
  {path:'profile',component:UserProfileComponent,canActivate:[AuthGuardGuard]},
  {path:'admin',component:AdminDashboardComponent,canActivate:[AuthGuardGuard]},
  {path:'reset',component:ResetComponent},
  {path:'rlogin',component:RestaurantLoginComponent},
  {path:'rregister',component:RestaurantRegistrationComponent},
  {path:'rdashboard',component:RestaurantDashboardComponent},
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'**',component:NotFoundComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
