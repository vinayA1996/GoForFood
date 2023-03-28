package com.example.OrderService.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR,reason = "Restaurant already exists")
public class RestaurantAlreadyExists extends Exception{
}
