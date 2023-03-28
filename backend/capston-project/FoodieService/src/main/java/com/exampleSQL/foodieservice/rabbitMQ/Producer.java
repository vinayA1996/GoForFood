package com.exampleSQL.foodieservice.rabbitMQ;

import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {
    @Autowired
    private DirectExchange directExchange;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendDtoToQueue(CommonUser commonUser){
        rabbitTemplate.convertAndSend(directExchange.getName(),"prox",commonUser);
//        rabbitTemplate.convertAndSend(directExchange.getName(),"order",commonUser);
    }

}
