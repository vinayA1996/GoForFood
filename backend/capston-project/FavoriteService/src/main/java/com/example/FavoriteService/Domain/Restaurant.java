package com.example.FavoriteService.Domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Restaurant {
    @Id
    private String resName;
    private String rating;
    private String image;
    private String resCity;
    private List<Menu> menu;
}
