package com.slack.services;

import com.slack.entities.BookCategory;
import com.slack.repositories.BookCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookCategoryService {

    private final BookCategoryRepository bookCategoryRepository;

    public List<BookCategory> getAllBookCategories() {
        return bookCategoryRepository.findAll();
    }
}
