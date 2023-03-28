package com.exampleSQL.foodieservice.service;

import com.exampleSQL.foodieservice.exception.UserAlreadyExists;
import com.exampleSQL.foodieservice.model.UserDetails;
import com.exampleSQL.foodieservice.proxy.UserProxy;
import com.exampleSQL.foodieservice.rabbitMQ.CommonUser;
import com.exampleSQL.foodieservice.rabbitMQ.Producer;
import com.exampleSQL.foodieservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomerServiceIMPL implements CustomerService{

    private UserRepository userRepository;
    private UserProxy userProxy;
    private Producer producer;

    @Autowired
    public CustomerServiceIMPL(UserRepository userRepository, UserProxy userProxy, Producer producer) {
        this.userRepository = userRepository;
        this.userProxy = userProxy;
        this.producer = producer;
    }

    @Override
    public UserDetails registerUser(UserDetails user) throws UserAlreadyExists {
        if(userRepository.findById(user.getEmail()).isPresent()) {
            throw new UserAlreadyExists();
        }
        UserDetails savedUser = userRepository.save(user);
//        CommonUser commonUser = new CommonUser();
//        commonUser.setEmail(user.getEmail());

        if(savedUser.getEmail() != ""){
            ResponseEntity re = userProxy.saveUser(user);
//            producer.sendDtoToQueue(commonUser);
        }
        return savedUser;
    }

    @Override
    public boolean addToFavorite(CommonUser commonUser) {
        producer.sendDtoToQueue(commonUser);
        return true;
    }

    @Override
    public UserDetails getUserDetails(String email) {
        UserDetails user = userRepository.findById(email).get();
        return user;
    }

    @Override
    public UserDetails editUserDetails(String email, UserDetails userDetails) {
        UserDetails user = userRepository.findById(email).get();
        if(!userDetails.getUsername().equals("")){
            user.setUsername(userDetails.getUsername());
        }

        if(userDetails.getPhoneNo() != null && userDetails.getPhoneNo().length() == 10){
            user.setUsername(userDetails.getUsername());
        }
        if(!userDetails.getAddress().getHouseNo().equals("") && !userDetails.getAddress().getStreet().equals("") && !userDetails.getAddress().getCity().equals("") && !userDetails.getAddress().getPinCode().equals("")){
            user.setAddress(userDetails.getAddress());
        }
        if(!userDetails.getImage().equals("")){
            user.setImage(userDetails.getImage());
        }
        return userRepository.save(user);
    }

}
