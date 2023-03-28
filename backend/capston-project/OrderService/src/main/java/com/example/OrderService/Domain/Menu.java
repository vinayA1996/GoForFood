package com.example.OrderService.Domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Menu {
    private String resName;
    @Id
    private String itemName;
    private String category;
    private String price;
    private String cuisine;
    private String resCity;
    //qty added
    private String qty;
    private int total;
}
