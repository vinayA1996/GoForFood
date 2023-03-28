package com.exampleSQL.foodieservice.controller;

import com.exampleSQL.foodieservice.exception.*;
import com.exampleSQL.foodieservice.model.Menu;
import com.exampleSQL.foodieservice.model.Restaurant;
import com.exampleSQL.foodieservice.model.RestaurantCity;
import com.exampleSQL.foodieservice.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/city")
public class RestaurantController {
    private RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @PostMapping("/addCity")
    public ResponseEntity<?> saveCity(@RequestBody RestaurantCity restaurantCity) throws CityAlreadyExistsException {
        return new ResponseEntity<>(restaurantService.saveCity(restaurantCity), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCities() {
        return new ResponseEntity<>(restaurantService.getAllCities(), HttpStatus.OK);
    }

    @PutMapping("/addRestaurant/{city}")
    public ResponseEntity<?> saveRestaurantToCity(@RequestBody Restaurant restaurant, @PathVariable("city") String city) throws RestaurantAlreadyExistsException, CityNotFoundException {
        return new ResponseEntity<>(restaurantService.saveRestaurantToCity(city, restaurant), HttpStatus.CREATED);
    }

    @GetMapping("/allRestaurants/{city}")
    public ResponseEntity<?> getAllRestaurantsByCity(@PathVariable("city") String city) {
        return new ResponseEntity<>(restaurantService.getAllRestaurantsByCity(city), HttpStatus.OK);
    }

    @PutMapping("/addMenu/{city}/{restaurant}")
    public ResponseEntity<?> saveMenuToRestaurant(@RequestBody Menu menu, @PathVariable("city") String city, @PathVariable("restaurant") String restaurant) throws CityNotFoundException, ItemAlreadyExistsException, RestaurantNotFoundException {
        return new ResponseEntity<>(restaurantService.saveMenuToRestaurant(city, restaurant, menu), HttpStatus.CREATED);
    }

    @GetMapping("/menu/{city}/{restaurant}")
    public ResponseEntity<?> getMenuByRestaurant(@PathVariable("city") String city, @PathVariable("restaurant") String restaurant) {
        return new ResponseEntity<>(restaurantService.getMenuByRestaurant(city, restaurant), HttpStatus.OK);
    }

    @PostMapping("/deleteRestaurant")
    public ResponseEntity<?> deleteRestaurant(@RequestBody Restaurant restaurant) {
        return new ResponseEntity<>(restaurantService.deleteRestaurnt(restaurant), HttpStatus.OK);
    }

    @PostMapping("/menudelete/{city}/{restaurant}")
    public ResponseEntity<?> deleteMenuByRestaurant(@PathVariable("city") String city, @PathVariable("restaurant") String restaurant, @RequestBody Menu menu) {
        return new ResponseEntity<>(restaurantService.deleteMenu(city, restaurant, menu), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{city}")
    public ResponseEntity<?> deleteCity(@PathVariable("city") String restaurantCity) throws CityAlreadyExistsException {
        return new ResponseEntity<>(restaurantService.deleteCity(restaurantCity), HttpStatus.OK);
    }

    @PostMapping("/restaurnatLogin")
    public ResponseEntity<?> resLogin(@RequestBody Restaurant restaurant) throws RestaurantNotFoundException {
        return new ResponseEntity<>(restaurantService.resLogin(restaurant), HttpStatus.ACCEPTED);
    }
    @PostMapping ("/getRestaurant")
    public ResponseEntity<?> getRestaurant(@RequestBody Restaurant restaurant) throws RestaurantNotFoundException {
        return new ResponseEntity<>(restaurantService.resGet(restaurant), HttpStatus.ACCEPTED);
    }

}
