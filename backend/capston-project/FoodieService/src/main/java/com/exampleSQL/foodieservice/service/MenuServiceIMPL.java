package com.exampleSQL.foodieservice.service;

import com.exampleSQL.foodieservice.model.Menu;
import com.exampleSQL.foodieservice.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuServiceIMPL implements MenuService{

    private MenuRepository menuRepository;

    @Autowired
    public MenuServiceIMPL(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    @Override
    public Menu saveMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    @Override
    public List<Menu> getAllFoods() {
        return menuRepository.findAll();
    }

    @Override
    public List<Menu> getAllFoodByPrice(String price) {
        return menuRepository.findByPrice(price);
    }

    @Override
    public List<Menu> getAllFoodByCategory(String category) {
        return menuRepository.findByCategory(category);
    }

    @Override
    public List<Menu> getAllFoodByCuisine(String cuisine) {
        return menuRepository.findByCuisine(cuisine);
    }


}
