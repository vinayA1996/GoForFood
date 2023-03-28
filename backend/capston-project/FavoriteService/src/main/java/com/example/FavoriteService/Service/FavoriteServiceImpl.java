package com.example.FavoriteService.Service;

import com.example.FavoriteService.Domain.Menu;
import com.example.FavoriteService.Domain.Restaurant;
import com.example.FavoriteService.Domain.UserFavorite;
import com.example.FavoriteService.Exception.FoodALreadyExists;
import com.example.FavoriteService.Exception.RestaurantAlreadyExistsException;
import com.example.FavoriteService.Repository.UserFavoriteRepository;
import com.example.FavoriteService.subscribe.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
@Service
public class FavoriteServiceImpl implements  FavoriteService {
    private UserFavoriteRepository userFavoriteRepository;

    @Autowired
    public FavoriteServiceImpl(UserFavoriteRepository userFavoriteRepository) {
        this.userFavoriteRepository = userFavoriteRepository;
    }

    @Override
    public UserFavorite addRestaurantsToFavorites(String email,Restaurant restaurant) {
        UserFavorite user = null;
        boolean flag = true;
        if (userFavoriteRepository.findById(email).isEmpty()) {
            user = new UserFavorite();
            user.setEmail(email);
            List<Restaurant> l = new ArrayList<>();
            l.add(restaurant);
            user.setRestaurantList(l);
            List<Menu> m = new ArrayList<>();
            user.setMenuList(m);
        }
        else{
            user = userFavoriteRepository.findById(email).get();
            List<Restaurant> list = user.getRestaurantList();
            Restaurant restaurant1;
            for (int i = 0; i < list.size(); i++) {
                restaurant1 = list.get(i);
                if (restaurant1.getResName().equals(restaurant.getResName())) {
//                    throw new RestaurantAlreadyExistsException();
                    flag = false;
                }
            }
            if(flag){
                list.add(restaurant);
                user.setRestaurantList(list);
            }
        }
        return userFavoriteRepository.save(user);
    }

    @Override
    public boolean removeRestaurantFromFavorites(Restaurant restaurant, String email) {
        UserFavorite user = userFavoriteRepository.findById(email).get();
        List<Restaurant> list = user.getRestaurantList();
        list.remove(restaurant);
        user.setRestaurantList(list);
        userFavoriteRepository.save(user);
        return true;
    }

    @Override
    public List<Restaurant> getFavoriteRestaurantsByEmail(String email) {
        UserFavorite user = userFavoriteRepository.findById(email).get();
        return user.getRestaurantList();
    }

    @Override
    public UserFavorite addMenuToFavorites(String email, Menu menu) {
        UserFavorite user = null;

        boolean flag = true;
        if (userFavoriteRepository.findById(email).isEmpty()) {
            user = new UserFavorite();
            user.setEmail(email);
            List<Restaurant> r = new ArrayList<>();
            user.setRestaurantList(r);
            List<Menu> l = new ArrayList<>();
            l.add(menu);
            user.setMenuList(l);
        }
        else{
            user = userFavoriteRepository.findById(email).get();
            List<Menu> list = user.getMenuList();
            Menu menu1;
            if(list.size() == 0){
                flag = true;
            }
            else{
                for (int i = 0; i < list.size(); i++) {
                    menu1 = list.get(i);
                    if (menu1.getItemName().equals(menu.getItemName())) {
//                    throw new RestaurantAlreadyExistsException();
                        flag = false;
                    }
                }
            }
            if(flag){
                list.add(menu);
                user.setMenuList(list);
            }
        }
        return userFavoriteRepository.save(user);
    }

    @Override
    public boolean removeMenuFromFavorites(String email, Menu menu) {
        UserFavorite user = userFavoriteRepository.findById(email).get();
        List<Menu> list = user.getMenuList();
        list.remove(menu);
        user.setMenuList(list);
        userFavoriteRepository.save(user);
        return true;
    }

    @Override
    public List<Menu> getFavoriteMenuItemsByEmail(String email) {
        UserFavorite user = userFavoriteRepository.findById(email).get();
        return user.getMenuList();
    }

}