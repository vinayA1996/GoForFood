package com.exampleSQL.foodieservice.proxy;

import com.exampleSQL.foodieservice.model.UserDetails;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name ="Authentication-Service",url = "http://localhost:8085")
public interface UserProxy {
    @PostMapping("/user/register")
    public ResponseEntity<?> saveUser(@RequestBody UserDetails userDetails);




}
