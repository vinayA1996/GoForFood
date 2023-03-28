package com.example.FavoriteService.Domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Menu {

    @Id
    private String itemName;
    private String category;
    private String price;
    private String cuisine;
    private String image;
    private String resName;
    private String resCity;
}
