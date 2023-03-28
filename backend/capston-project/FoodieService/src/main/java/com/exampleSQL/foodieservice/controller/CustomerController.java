package com.exampleSQL.foodieservice.controller;

import com.exampleSQL.foodieservice.exception.UserAlreadyExists;
import com.exampleSQL.foodieservice.model.UserDetails;
import com.exampleSQL.foodieservice.rabbitMQ.CommonUser;
import com.exampleSQL.foodieservice.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/customer")

public class CustomerController {
    private CustomerService customerService;
    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody UserDetails userDetails) throws UserAlreadyExists {
        return new ResponseEntity<>(customerService.registerUser(userDetails),HttpStatus.CREATED);
    }

    @PostMapping("/favorite")
    public ResponseEntity<?> addToFavorite(@RequestBody CommonUser commonUser){
        return new ResponseEntity<>(customerService.addToFavorite(commonUser),HttpStatus.CREATED);
    }

    @GetMapping("/getUser/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email){
        return new ResponseEntity<>(customerService.getUserDetails(email),HttpStatus.OK);
    }

    @PutMapping("/editUser/{email}")
    public ResponseEntity<?> editUserDetails(@PathVariable String email,@RequestBody UserDetails user){
        return new ResponseEntity<>(customerService.editUserDetails(email,user),HttpStatus.OK);
    }
}
