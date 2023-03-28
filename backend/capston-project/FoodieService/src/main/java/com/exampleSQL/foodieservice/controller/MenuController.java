package com.exampleSQL.foodieservice.controller;

import com.exampleSQL.foodieservice.model.Menu;
import com.exampleSQL.foodieservice.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("foodieservice")
public class MenuController {
    private MenuService menuService;
    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }
    @PostMapping("/menu/save")
    public ResponseEntity<?> registerCustomer(@RequestBody Menu menu){
        return new ResponseEntity<>( menuService.saveMenu(menu), HttpStatus.CREATED);
    }
    @GetMapping("/menu/all")
    public ResponseEntity<?> getallmenu(){
        return new ResponseEntity<>( menuService.getAllFoods(), HttpStatus.CREATED);
    }

    @GetMapping("/menu/price={price}")
    public ResponseEntity<?> getallmenubyprice(@PathVariable("price") String price ){

        return new ResponseEntity<>( menuService.getAllFoodByPrice(price), HttpStatus.CREATED);

    }

    @GetMapping("/menu/category={category}")
    public ResponseEntity<?> getallmenubycategory(@PathVariable("category") String category ){

        return new ResponseEntity<>( menuService.getAllFoodByCategory(category), HttpStatus.CREATED);

    }

    @GetMapping("/menu/cuisine={cuisine}")
    public ResponseEntity<?> getallmenubycuisine(@PathVariable("cuisine") String cuisine ){

        return new ResponseEntity<>( menuService.getAllFoodByCuisine(cuisine), HttpStatus.CREATED);

    }

}
