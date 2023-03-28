package com.example.FavoriteService.subscribe;

import com.example.FavoriteService.Service.NotificationService;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    private NotificationService notificationService;

    @RabbitListener(queues ="message_q2")
    public void getDtoFromQueueAndAddToDb(UserDTO userDTO) {

        }
    }


