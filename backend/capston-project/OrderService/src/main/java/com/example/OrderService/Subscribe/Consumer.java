package com.example.OrderService.Subscribe;

import com.example.OrderService.Domain.UserOrderAdded;
import com.example.OrderService.Service.OrderService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    private OrderService orderService;

    @RabbitListener(queues ="message_q2")
    public void getDtoFromQueueAndAddToDb(UserDTO userDTO) {
        UserOrderAdded userOrderAdded= new UserOrderAdded();

        userOrderAdded.setMenu(userDTO.getMenu());
        userOrderAdded.setEmail(userDTO.getEmail());

      orderService.orderAdded(userOrderAdded);

//      users.setRestaurant(userDTO.getRestaurantlist());

    }

}
