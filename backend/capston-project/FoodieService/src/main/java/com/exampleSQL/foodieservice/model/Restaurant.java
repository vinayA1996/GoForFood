package com.exampleSQL.foodieservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class Restaurant {

    @Id
    private String resName;//-registrationform
    private String image;//-registrationform
    private String resCity;//-registration-noform
    //-------------------------------------------
    private  String resMail;//-registrationform
    private  String resPassword;//-registrationform
    private boolean active;//-admin
    //-------------------------------------------
    private List<Menu> menu;//-after login
    private String rating;//-admin


}
