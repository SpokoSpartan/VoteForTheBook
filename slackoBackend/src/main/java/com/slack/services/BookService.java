package com.slack.services;

import com.slack.DTOs.BookDTO;
import com.slack.entities.Author;
import com.slack.entities.Book;
import com.slack.entities.BookCategory;
import com.slack.entities.User;
import com.slack.exceptions.EntityNotFoundException;
import com.slack.repositories.AuthorRepository;
import com.slack.repositories.BookCategoryRepository;
import com.slack.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BookService {

    private final AutocompletionService autocompletionService;
    private final BookRepository bookRepository;
    private final BookCategoryRepository bookCategoryRepository;
    private final AuthorRepository authorRepository;
    private final UserService userService;

    public List<BookDTO> getBooksByIsbn(String isbn) {
        List<BookDTO> books = new ArrayList();
        BookDTO book1 = autocompletionService.getBookDetailsFromApiGoogle(isbn);
        BookDTO book2 = autocompletionService.getBookDetailsFromApiItBookStore(isbn);
        BookDTO book3 = autocompletionService.getBookDetailsFromApiBN(isbn);
        if(book1 != null)
            books.add(book1);
        if(book2 != null)
            books.add(book2);
        if(book3 != null)
            books.add(book3);
        return books;
    }

    public List<Book> getAllBooks() {
        User user = userService.getLoggedInUser();
        List<Book> books = bookRepository.findAll();
        for(Book book: books){
            if(book.getVotedUsers().contains(user)) {
                book.setIsVotedByUser(true);
            } else {
                book.setIsVotedByUser(false);
            }
        }
        return books;
    }

    public Book getOneBook(Long bookId) {
        return bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("book"));
    }

    public Book createBook(BookDTO bookDTO) {
        Book book = new Book();
        book = castBookDtoToBook(bookDTO, book);
        return bookRepository.save(book);
    }

    public Book updateBook(BookDTO bookDTO, Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("book"));
        return bookRepository.save(castBookDtoToBook(bookDTO, book));
    }

    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("book"));
        bookRepository.delete(book);
    }

    private Book castBookDtoToBook(BookDTO bookDTO, Book book) {
        book.setIsbn(bookDTO.getIsbn());
        book.setTitle(bookDTO.getTitle());
        book.setCoverPictureUrl(bookDTO.getCoverPictureUrl());
        book.setDescription(bookDTO.getDescription());
        book.setPublicationDate(bookDTO.getPublicationDate());
        book.setCategories(validateBookCategories(bookDTO.getCategories()));
        book.setAuthors(validateAuthors(bookDTO.getAuthors()));
        return book;
    }

    private List<Author> validateAuthors(List<Author> authors) {
        List<Author> authorsToPersist = authors.stream().filter(
                author -> author.getId() != null).collect(Collectors.toList());
        List<Long> authorsToPersistById = authorsToPersist.stream().map(
                Author::getId).collect(Collectors.toList());
        authors.removeAll(authorsToPersist);
        authors.addAll(authorRepository.findAllById(authorsToPersistById));
        return authors;
    }

    private List<BookCategory> validateBookCategories(List<BookCategory> bookCategories) {
        List<BookCategory> categoriesToPersist = bookCategories.stream().filter(
                bookCategory -> bookCategory.getId() != null).collect(Collectors.toList());
        bookCategories.removeAll(categoriesToPersist);
        List<Long> categoriesToPersistById = categoriesToPersist.stream().map(
                BookCategory::getId).collect(Collectors.toList());
        bookCategories.addAll(bookCategoryRepository.findAllById(categoriesToPersistById));
        return bookCategories;
    }
 }
