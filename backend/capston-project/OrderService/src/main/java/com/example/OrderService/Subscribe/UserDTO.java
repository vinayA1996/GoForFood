package com.example.OrderService.Subscribe;

import com.example.OrderService.Domain.Address;
import com.example.OrderService.Domain.Menu;
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
    private List<Menu> menu;
    private Address address;
}
