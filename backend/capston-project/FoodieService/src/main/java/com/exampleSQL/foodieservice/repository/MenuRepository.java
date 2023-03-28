package com.exampleSQL.foodieservice.repository;

import com.exampleSQL.foodieservice.model.Menu;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MenuRepository extends MongoRepository<Menu,String> {

    public List<Menu> findByCategory(String category);
    public List<Menu> findByPrice(String price);
    public List<Menu> findByCuisine(String cuisine);

}
