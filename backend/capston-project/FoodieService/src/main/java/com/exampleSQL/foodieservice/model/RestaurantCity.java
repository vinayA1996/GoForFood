package com.exampleSQL.foodieservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class RestaurantCity {
    @Id
    private String city;
    private String image;
    private List<Restaurant> restaurantList;
}
