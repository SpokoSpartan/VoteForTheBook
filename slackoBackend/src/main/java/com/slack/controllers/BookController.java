package com.slack.controllers;

import static com.slack.utils.Mapping.*;

import com.slack.DTOs.BookDTO;
import com.slack.entities.Book;
import com.slack.services.BookService;
import com.slack.validators.DTOValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(API_VERSION + BOOK)
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping(GET_BY_ISBN)
    public List<BookDTO> getBooksByIsbn(@PathVariable String isbn) {
        DTOValidator.validateIsbn(isbn);
        return bookService.getBooksByIsbn(isbn);
    }

    @GetMapping(GET_ALL)
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping(CREATE)
    public Book createBook(@RequestBody @Valid BookDTO bookDTO, BindingResult bindingResult) {
        DTOValidator.validate(bindingResult);
        return bookService.createBook(bookDTO);
    }

    @PostMapping(UPDATE)
    public Book updateBook(@PathVariable Long id, @RequestBody @Valid BookDTO bookDTO, BindingResult bindingResult) {
        DTOValidator.validate(bindingResult);
        return bookService.updateBook(bookDTO, id);
    }

    @DeleteMapping(REMOVE)
    public void removeBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }
}
