package com.example.FavoriteService.Repository;

import com.example.FavoriteService.Domain.UserFavorite;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFavoriteRepository extends MongoRepository<UserFavorite,String> {
}
