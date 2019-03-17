package com.slack.controllers;

import static com.slack.utils.Mapping.*;

import com.slack.entities.Author;
import com.slack.services.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(API_VERSION + AUTHOR)
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    @GetMapping(GET_ALL)
    public List<Author> getAllAuthors() {
        return authorService.getAllAuthors();
    }
}
