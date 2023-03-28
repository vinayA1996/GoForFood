package com.example.FavoriteService.subscribe;

import com.example.FavoriteService.Domain.Menu;
import com.example.FavoriteService.Domain.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class UserDTO {

    private String email;
    private Restaurant restaurant;
    private Menu menu;
}
