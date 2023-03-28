package com.example.OrderService.Repository;

import com.example.OrderService.Domain.UserOrderAdded;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserOrderAddedRepository extends MongoRepository<UserOrderAdded,String> {
}
