package com.example.OrderService.Service;

import com.example.OrderService.Domain.Menu;
import com.example.OrderService.Domain.Order;
import com.example.OrderService.Domain.UserOrderAdded;
import com.example.OrderService.Domain.UserOrderPlaced;
import com.example.OrderService.Repository.UserOrderAddedRepository;
import com.example.OrderService.Repository.UserOrderPlacedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;

@Service
public class OrderServiceImpl implements  OrderService{
    private UserOrderAddedRepository userOrderAddedRepository;
    private UserOrderPlacedRepository userOrderPlacedRepository;

    @Autowired
    public OrderServiceImpl(UserOrderAddedRepository userOrderAddedRepository, UserOrderPlacedRepository userOrderPlacedRepository) {
        this.userOrderAddedRepository = userOrderAddedRepository;
        this.userOrderPlacedRepository = userOrderPlacedRepository;
    }

    @Override
    public UserOrderAdded orderAdded(UserOrderAdded userOrderAdded) {
        if(!userOrderAddedRepository.findById(userOrderAdded.getEmail()).isPresent()){
            userOrderAddedRepository.save(userOrderAdded);
        }
        else {
            UserOrderAdded userOrderAdded1= userOrderAddedRepository.findById(userOrderAdded.getEmail()).get();
            userOrderAddedRepository.deleteById(userOrderAdded.getEmail());
        }
        return userOrderAddedRepository.save(userOrderAdded);

    }

    @Override
    public UserOrderPlaced orderPlaced(UserOrderPlaced userOrderPlaced) {
        UserOrderPlaced userOrderPlaced1 = null;
        if(userOrderPlacedRepository.findById(userOrderPlaced.getEmail()).isPresent()){
            userOrderPlaced1 = userOrderPlacedRepository.findById(userOrderPlaced.getEmail()).get();
            List<Order> list = userOrderPlaced1.getOrderList();
            list.add(userOrderPlaced.getOrderList().get(0));
            userOrderPlaced1.setOrderList(list);
        }
        else {
            userOrderPlaced1 = userOrderPlaced;
        }
        return userOrderPlacedRepository.save(userOrderPlaced1);
    }

    @Override
    public UserOrderAdded getDataByEmail(String email) {
        UserOrderAdded userOrderAdded =  userOrderAddedRepository.findById(email).get();
        return userOrderAdded;
    }

    @Override
    public List<Order> getAllOrders(String email) {
        return userOrderPlacedRepository.findById(email).get().getOrderList();
    }

    @Override
    public Order getCurrentOrder(String email) {
        UserOrderPlaced user =  userOrderPlacedRepository.findById(email).get();
        int index = user.getOrderList().size() - 1;
        return user.getOrderList().get(index);
    }

    @Override
    public UserOrderAdded deleteMenu(String email, Menu menu) {
        UserOrderAdded userOrderAdded1= userOrderAddedRepository.findById(email).get();
        List<Menu> menuList=userOrderAdded1.getMenu();
        Menu menu1;
        Iterator<Menu> i = menuList.iterator();

        while (i.hasNext()){
            menu1=i.next();
            if (menu1.getItemName().equals(menu.getItemName())&& menu1.getQty().equals(menu.getQty())){
                i.remove();
            }
        }
        userOrderAdded1.setMenu(menuList);
        return userOrderAddedRepository.save(userOrderAdded1);
    }

    @Override
    public boolean clearCart(String email) {
        userOrderAddedRepository.deleteById(email);
        return true;
    }
}
