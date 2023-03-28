package com.example.FavoriteService.controller;

import com.example.FavoriteService.Domain.Menu;
import com.example.FavoriteService.Domain.Restaurant;
import com.example.FavoriteService.Domain.UserFavorite;
import com.example.FavoriteService.Exception.RestaurantAlreadyExistsException;
import com.example.FavoriteService.Service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("favorite")
public class FavoriteServiceController {
private FavoriteService favoriteService;

    @Autowired
    public FavoriteServiceController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/addRestaurant/{email}")
    public ResponseEntity<?> addRestaurantToFavorites(@RequestBody Restaurant restaurant ,@PathVariable("email") String email ) {
        return new ResponseEntity<>( favoriteService.addRestaurantsToFavorites(email,restaurant), HttpStatus.CREATED);
    }

    @GetMapping("/restaurants/{email}")
    public ResponseEntity<?> getAllRestaurantsByEmail(@PathVariable("email") String email ){
        return new ResponseEntity<>(favoriteService.getFavoriteRestaurantsByEmail(email), HttpStatus.OK);
    }

    @PostMapping("/removeRestaurant/{email}")
    public ResponseEntity<?> removeRestaurantFromFavorites(@RequestBody Restaurant restaurant ,@PathVariable("email") String email ){
        return new ResponseEntity<>(favoriteService.removeRestaurantFromFavorites(restaurant,email) , HttpStatus.OK);
    }

    @PostMapping("/addMenu/{email}")
    public ResponseEntity<?> addMenuToFavorites(@RequestBody Menu menu , @PathVariable("email") String email ) {
        return new ResponseEntity<>( favoriteService.addMenuToFavorites(email,menu), HttpStatus.CREATED);
    }

    @GetMapping("/menu/{email}")
    public ResponseEntity<?> getAllMenuItemsByEmail(@PathVariable("email") String email ){
        return new ResponseEntity<>(favoriteService.getFavoriteMenuItemsByEmail(email), HttpStatus.OK);
    }

    @PostMapping("/removeMenu/{email}")
    public ResponseEntity<?> removeMenuFromFavorites(@RequestBody Menu menu  ,@PathVariable("email") String email ){
        return new ResponseEntity<>(favoriteService.removeMenuFromFavorites(email,menu) , HttpStatus.OK);
    }

}
