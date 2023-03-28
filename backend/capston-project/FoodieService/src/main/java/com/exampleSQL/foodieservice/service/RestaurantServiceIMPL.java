package com.exampleSQL.foodieservice.service;

import com.exampleSQL.foodieservice.exception.*;
import com.exampleSQL.foodieservice.model.Menu;
import com.exampleSQL.foodieservice.model.Restaurant;
import com.exampleSQL.foodieservice.model.RestaurantCity;
import com.exampleSQL.foodieservice.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

@Service
public class RestaurantServiceIMPL implements RestaurantService {

    private RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantServiceIMPL(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public RestaurantCity saveCity(RestaurantCity restaurantCity) throws CityAlreadyExistsException {
        if (restaurantRepository.findById(restaurantCity.getCity()).isEmpty()) {
            return restaurantRepository.save(restaurantCity);
        } else {
            throw new CityAlreadyExistsException();
        }
    }

    @Override
    public List<RestaurantCity> getAllCities() {
        return restaurantRepository.findAll();
    }

    @Override
    public RestaurantCity saveRestaurantToCity(String city, Restaurant restaurant) throws RestaurantAlreadyExistsException, CityNotFoundException {
        if (restaurantRepository.findById(city).isEmpty()) {
            throw new CityNotFoundException();
        }
        RestaurantCity rc = restaurantRepository.findById(city).get();
        List<Restaurant> list = rc.getRestaurantList();
        for (Restaurant value : list) {
            if (value.getResName().equals(restaurant.getResName())) {
                throw new RestaurantAlreadyExistsException();
            }
        }
        list.add(restaurant);
        rc.setRestaurantList(list);
        return restaurantRepository.save(rc);
    }

    @Override
    public List<Restaurant> getAllRestaurantsByCity(String city) {
        return restaurantRepository.findById(city).get().getRestaurantList();
    }

    @Override
    public RestaurantCity saveMenuToRestaurant(String city, String resName, Menu menu) throws CityNotFoundException, ItemAlreadyExistsException, RestaurantNotFoundException {
        if (restaurantRepository.findById(city).isEmpty()) {
            throw new CityNotFoundException();
        }
        RestaurantCity rc = restaurantRepository.findById(city).get();
        List<Restaurant> list = rc.getRestaurantList();
        boolean flag = true;
        for (Restaurant restaurant : list) {
            if (restaurant.getResName().equals(resName)) {
                flag = false;
            }
        }
        if (flag) {
            throw new RestaurantNotFoundException();
        }
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getResName().equals(resName)) {
                Restaurant r = list.get(i);
                List<Menu> m = r.getMenu();
                for (int j = 0; j < m.size(); j++) {
                    if (m.get(j).getItemName().equals(menu.getItemName())) {
                        throw new ItemAlreadyExistsException();
                    }
                }
                m.add(menu);
                r.setMenu(m);
            }
        }
        return restaurantRepository.save(rc);
    }

    @Override
    public List<Menu> getMenuByRestaurant(String city, String resName) {
        List<Restaurant> list = restaurantRepository.findById(city).get().getRestaurantList();
        List<Menu> menu = null;
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getResName().equals(resName)) {
                menu = list.get(i).getMenu();
            }
        }
        return menu;
    }

    @Override
    public boolean deleteMenu(String city, String resName, Menu menu) {

        RestaurantCity rc = restaurantRepository.findById(city).get();
        List<Restaurant> list = restaurantRepository.findById(city).get().getRestaurantList();
        List<Menu> menu1 = null;
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getResName().equals(resName)) {
                menu1 = list.get(i).getMenu();
                menu1.remove(menu);
            }
        }


        rc.setRestaurantList(list);

        restaurantRepository.save(rc);

        return true;
    }

    @Override
    public boolean deleteRestaurnt(Restaurant restaurnt) {
        RestaurantCity rc = restaurantRepository.findById(restaurnt.getResCity()).get();
        List<Restaurant> list = rc.getRestaurantList();
        list.remove(restaurnt);
        rc.setRestaurantList(list);
        restaurantRepository.deleteById(restaurnt.getResCity());
        restaurantRepository.save(rc);

        return true;
    }

    @Override
    public boolean deleteCity(String restaurantCity) {
        restaurantRepository.deleteById(restaurantCity);
        return true;
    }

    @Override
    public Restaurant resLogin(Restaurant restaurant) throws RestaurantNotFoundException {
        RestaurantCity restaurantCity;
        Restaurant restaurant1;

        if (restaurantRepository.findById(restaurant.getResCity()).isPresent()) {
            restaurantCity = restaurantRepository.findByCity(restaurant.getResCity());

            List<Restaurant> restaurantList = restaurantCity.getRestaurantList();
          for (int i=0;i<restaurantList.size();i++) {
              if (restaurantList.get(i).getResMail().equals(restaurant.getResMail()) &&
                      restaurantList.get(i).getResPassword().equals(restaurant.getResPassword())) {


                  return restaurantList.get(i);
              }
          }
        }
        throw new RestaurantNotFoundException();

    }

    @Override
    public Restaurant resGet(Restaurant restaurant) throws RestaurantNotFoundException {
        RestaurantCity restaurantCity;
        Restaurant restaurant1;

        if (restaurantRepository.findById(restaurant.getResCity()).isPresent()) {
            restaurantCity = restaurantRepository.findByCity(restaurant.getResCity());

            List<Restaurant> restaurantList = restaurantCity.getRestaurantList();
            for (int i=0;i<restaurantList.size();i++) {
                if (restaurantList.get(i).getResMail().equals(restaurant.getResMail())) {


                    return restaurantList.get(i);
                }
            }
        }
        throw new RestaurantNotFoundException();

    }
}

