package com.exampleSQL.foodieservice.service;

import com.exampleSQL.foodieservice.model.Menu;

import java.util.List;

public interface MenuService {

    public Menu saveMenu(Menu menu);

    public List<Menu> getAllFoods();

    public List<Menu> getAllFoodByPrice(String  price);

    public List<Menu> getAllFoodByCategory(String  Category);

    public List<Menu> getAllFoodByCuisine(String Cuisine);

}
