package com.example.FavoriteService.Service;

import com.example.FavoriteService.Domain.Menu;
import com.example.FavoriteService.Domain.Restaurant;
import com.example.FavoriteService.Domain.UserFavorite;
import com.example.FavoriteService.Exception.FoodALreadyExists;
import com.example.FavoriteService.Exception.RestaurantAlreadyExistsException;
import com.example.FavoriteService.subscribe.UserDTO;

import java.util.List;

public interface FavoriteService {

    public UserFavorite addRestaurantsToFavorites(String email, Restaurant restaurant);
    public boolean removeRestaurantFromFavorites(Restaurant restaurant,String email);
    public List<Restaurant> getFavoriteRestaurantsByEmail(String email);
    public UserFavorite addMenuToFavorites(String email, Menu menu);
    public boolean removeMenuFromFavorites(String email,Menu menu);
    public List<Menu> getFavoriteMenuItemsByEmail(String email);







}


