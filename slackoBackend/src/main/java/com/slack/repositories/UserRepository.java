package com.slack.repositories;

import com.slack.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM \"user\" u WHERE UPPER(u.nick_name) LIKE ?1 || '%'",
            nativeQuery = true)
    List<User> findAllByFirstPartOfNick(String name);
}