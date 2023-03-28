package com.exampleSQL.foodieservice.service;

import com.exampleSQL.foodieservice.exception.*;
import com.exampleSQL.foodieservice.model.Menu;
import com.exampleSQL.foodieservice.model.Restaurant;
import com.exampleSQL.foodieservice.model.RestaurantCity;

import java.util.List;

public interface RestaurantService {
    public RestaurantCity saveCity(RestaurantCity restaurantCity) throws CityAlreadyExistsException;
    public List<RestaurantCity> getAllCities();
    public RestaurantCity saveRestaurantToCity(String city, Restaurant restaurant) throws RestaurantAlreadyExistsException, CityNotFoundException;
    public List<Restaurant> getAllRestaurantsByCity(String city);
    public RestaurantCity saveMenuToRestaurant(String city, String resName, Menu menu) throws CityNotFoundException, ItemAlreadyExistsException, RestaurantNotFoundException;
    public List<Menu> getMenuByRestaurant(String city,String resName);
    public boolean deleteMenu(String city,String resName,Menu menu);
    public boolean deleteRestaurnt(Restaurant restaurant);
    public boolean deleteCity(String restaurantCity);

    public Restaurant resLogin(Restaurant restaurant) throws RestaurantNotFoundException;

    public Restaurant resGet(Restaurant restaurant) throws RestaurantNotFoundException;

}
