package com.example.OrderService.Repository;


import com.example.OrderService.Domain.UserOrderPlaced;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserOrderPlacedRepository  extends MongoRepository<UserOrderPlaced,String> {
}
