package com.exampleSQL.foodieservice.rabbitMQ;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class MessageConfig {
    private String exchange_name = "ex_name";
    private String q_message = "message_q2";

    private String q_message1="message_q1";

    @Bean
    public DirectExchange getDirectExchange(){
        return new DirectExchange(exchange_name);
    }

    @Bean
    public Queue getQueue()
    {
        return new Queue(q_message);
    }

//    @Bean
//    public Queue getQueuefororder()
//    {
//        return new Queue(q_message1);
//    }

    @Bean
    public Jackson2JsonMessageConverter getMusicJackSonConv(){
        return  new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate getRabbitTemp(final ConnectionFactory connectionFactory){

        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);

        rabbitTemplate.setMessageConverter(getMusicJackSonConv());

        return rabbitTemplate;
    }

    @Bean
    public Binding getBinding(Queue queue, DirectExchange directExchange){
        return BindingBuilder.bind(queue).to(directExchange).with("prox");
    }

//    @Bean
//    public Binding getBindingfororder(Queue queue, DirectExchange directExchange){
//        return BindingBuilder.bind(queue).to(directExchange).with("order");
//    }

}
