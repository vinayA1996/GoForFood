package com.example.OrderService.Domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Order {

    @Id
    private String orderId;
    private List<Menu> menu;
    private String dateOfOrder;
    private String timeOfOrder;
    private String noOfItems;
    private String amount;
}
