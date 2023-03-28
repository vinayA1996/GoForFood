package com.example.OrderService.Domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Address {
    private String houseno;
    private String street;
    @Id
    private String city;
    private String pincode;
}
