package com.slack.controllers;

import static com.slack.utils.Mapping.*;

import com.slack.entities.BookCategory;
import com.slack.services.BookCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(API_VERSION + BOOK_CATEGORY)
@RequiredArgsConstructor
public class BookCategoryController {

    private final BookCategoryService bookCategoryService;

    @GetMapping(GET_ALL)
    public List<BookCategory> getAllBookCategories() {
        return bookCategoryService.getAllBookCategories();
    }
}
