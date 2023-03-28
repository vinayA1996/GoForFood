package com.exampleSQL.foodieservice.service;

import com.exampleSQL.foodieservice.exception.UserAlreadyExists;
import com.exampleSQL.foodieservice.model.UserDetails;
import com.exampleSQL.foodieservice.rabbitMQ.CommonUser;

public interface CustomerService {
    public UserDetails registerUser(UserDetails userDetails) throws UserAlreadyExists;

    public boolean addToFavorite(CommonUser commonUser);

    public UserDetails getUserDetails(String email);

    public UserDetails editUserDetails(String email,UserDetails userDetails);
}
