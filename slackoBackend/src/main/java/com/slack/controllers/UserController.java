package com.slack.controllers;

import static com.slack.utils.Mapping.*;

import com.slack.DTOs.UserDTO;
import com.slack.services.UserService;
import com.slack.validators.DTOValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_VERSION + USER)
public class UserController {

    private final UserService userService;

    @GetMapping(GET_ALL)
    public ResponseEntity findAllByFirstPartOfNick(@PathVariable String name) {
        return ResponseEntity.ok(userService.findAllByFirstPartOfNick(name));
    }

    @PostMapping(CREATE)
    public ResponseEntity createUser(@RequestBody @Valid UserDTO userDTO, BindingResult bindingResult) {
        DTOValidator.validate(bindingResult);
        return ResponseEntity.ok(userService.createUser(userDTO));
    }
}
