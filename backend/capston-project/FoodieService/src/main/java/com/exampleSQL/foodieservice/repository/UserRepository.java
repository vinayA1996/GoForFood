package com.exampleSQL.foodieservice.repository;

import com.exampleSQL.foodieservice.model.UserDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserDetails,String> {


    public UserDetails findByEmail(String email);
}
