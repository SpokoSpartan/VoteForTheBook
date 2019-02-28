package com.slack.controllers;

import static com.slack.utils.Mapping.*;

import com.slack.DTOs.GroupDTO;
import com.slack.services.GroupService;
import com.slack.validators.DTOValidator;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_VERSION + GROUP)
public class GroupController {

    private final GroupService groupService;

    @PostMapping(CREATE)
    public ResponseEntity createNewGroup(@RequestBody @Valid GroupDTO groupDTO, BindingResult bindingResult) {
        DTOValidator.validate(bindingResult);
        return ResponseEntity.ok(groupService.createGroup(groupDTO));
    }
}
