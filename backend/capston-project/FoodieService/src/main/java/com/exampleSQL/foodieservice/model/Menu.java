package com.exampleSQL.foodieservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class Menu {

    @Id
   private String itemName;
   private String category;
   private String price;
   private String cuisine;
   private String qty;
   private String image;
   private String resName;
   private String resCity;



}
