package com.exampleSQL.foodieservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Address {

    private String houseNo;
    private String street;
    @Id
    private String city;
    private String pinCode;






}
