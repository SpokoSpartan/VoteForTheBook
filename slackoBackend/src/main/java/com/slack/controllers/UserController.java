package com.slack.controllers;

import static com.slack.utils.Mapping.*;

import com.slack.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_VERSION + USER)
public class UserController {

    private final UserService userService;

    @GetMapping(GET_ALL)
    public ResponseEntity findAllByFirstPartOfNick(@PathVariable String name) {
        return ResponseEntity.ok(userService.findAllByFirstPartOfNick(name));
    }
}
