package com.exampleSQL.foodieservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDetails {

    private String firstName;
    private String lastName;
    private String username;
    @Id
    private String email;
    private String password;
    private Address address;
    private String phoneNo;
    private String image;
    private String role;

}
