package com.exampleSQL.foodieservice.repository;

import com.exampleSQL.foodieservice.model.RestaurantCity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantRepository extends MongoRepository<RestaurantCity,String> {
    public RestaurantCity findByCity(String city);
}
