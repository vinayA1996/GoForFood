package com.example.FavoriteService.subscribe;

import com.example.FavoriteService.Domain.Restaurant;
import com.example.FavoriteService.Domain.UserFavorite;
import com.example.FavoriteService.Service.FavoriteService;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    private FavoriteService favoriteService;

    @RabbitListener(queues ="message_q2")
    public void getDtoFromQueueAndAddToDb(UserDTO userDTO) {
        if(userDTO.getMenu() == null){
            favoriteService.addRestaurantsToFavorites(userDTO.getEmail(), userDTO.getRestaurant());
        }
       else {
           favoriteService.addMenuToFavorites(userDTO.getEmail(), userDTO.getMenu());
        }
    }

}
