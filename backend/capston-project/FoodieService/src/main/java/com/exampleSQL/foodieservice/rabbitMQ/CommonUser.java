package com.exampleSQL.foodieservice.rabbitMQ;

import com.exampleSQL.foodieservice.model.Menu;
import com.exampleSQL.foodieservice.model.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CommonUser {

    private String email;
    private Restaurant restaurant;
    private Menu menu;

}
