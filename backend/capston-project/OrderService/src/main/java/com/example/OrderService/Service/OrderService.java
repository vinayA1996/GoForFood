package com.example.OrderService.Service;

import com.example.OrderService.Domain.Menu;
import com.example.OrderService.Domain.Order;
import com.example.OrderService.Domain.UserOrderAdded;
import com.example.OrderService.Domain.UserOrderPlaced;

import java.util.List;

public interface OrderService {
    public UserOrderAdded orderAdded(UserOrderAdded userOrderAdded);
    public UserOrderPlaced orderPlaced(UserOrderPlaced userOrderPlaced);
    public UserOrderAdded getDataByEmail(String email);
    public List<Order> getAllOrders(String email);
    public Order getCurrentOrder(String email);
    public UserOrderAdded deleteMenu(String email,Menu menu);
    public boolean clearCart(String email);
}
