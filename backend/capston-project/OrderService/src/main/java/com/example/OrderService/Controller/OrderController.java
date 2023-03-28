package com.example.OrderService.Controller;

import com.example.OrderService.Domain.Menu;
import com.example.OrderService.Domain.UserOrderAdded;
import com.example.OrderService.Domain.UserOrderPlaced;
import com.example.OrderService.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/order")
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @PostMapping("/add")
    public ResponseEntity<?> addItems(@RequestBody UserOrderAdded userOrderAdded){

        return new ResponseEntity<>( orderService.orderAdded(userOrderAdded), HttpStatus.CREATED);

    }

    @GetMapping("/get/{email}")
    public ResponseEntity<?> getItems(@PathVariable String email){

        return new ResponseEntity<>( orderService.getDataByEmail(email), HttpStatus.OK);

    }

    @GetMapping("/getOrders/{email}")
    public ResponseEntity<?> getAllOrderDetails(@PathVariable String email){

        return new ResponseEntity<>( orderService.getAllOrders(email), HttpStatus.OK);

    }

    @GetMapping("/currentOrder/{email}")
    public ResponseEntity<?> getCurrentOrder(@PathVariable String email){

        return new ResponseEntity<>( orderService.getCurrentOrder(email), HttpStatus.OK);

    }

    @PostMapping("/placed")
    public ResponseEntity<?> orderPlaced(@RequestBody UserOrderPlaced userOrderPlaced){

        return new ResponseEntity<>( orderService.orderPlaced(userOrderPlaced), HttpStatus.CREATED);

    }

    @PostMapping("/deleteItem/{email}")
    public ResponseEntity<?> deleteItem(@PathVariable String email, @RequestBody Menu menu){
        return new ResponseEntity<>( orderService.deleteMenu(email,menu), HttpStatus.OK);
    }

    @DeleteMapping ("/clearCart/{email}")
    public ResponseEntity<?> delete(@PathVariable String email){
        return new ResponseEntity<>( orderService.clearCart(email), HttpStatus.OK);
    }

}
