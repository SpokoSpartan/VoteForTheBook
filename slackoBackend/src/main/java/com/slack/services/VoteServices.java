package com.slack.services;

import com.slack.entities.Book;
import com.slack.entities.User;
import com.slack.exceptions.ValidationException;
import com.slack.repositories.BookRepository;
import com.slack.utils.Constans;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class VoteServices {

    private final UserService userService;
    private final BookRepository bookRepository;

    @Transactional
    public List<Book> voteForBook(Long bookId) {
        User user = userService.getLoggedInUser();
        if(bookRepository.countBookByVotedUsers(user) > Constans.MAX_COUNT_OF_FIRST_VOTING - 1) {
            throw new ValidationException("sdfds");
        }
        List<Book> books = bookRepository.findAll();
        for(Book book: books) {
            if(book.getId().equals(bookId)) {
                if(!book.getVotedUsers().contains(user)) {
                    List<User> votedUsers = book.getVotedUsers();
                    votedUsers.add(user);
                    book.setVotedUsers(votedUsers);
                }
                book.setIsVotedByUser(true);
            } else {
                if(book.getVotedUsers().contains(user)) {
                    book.setIsVotedByUser(true);
                } else {
                    book.setIsVotedByUser(false);
                }
            }
        }
        return books;
    }

    @Transactional
    public List<Book> removeVoteFromBook(Long bookId) {
        User user = userService.getLoggedInUser();
        List<Book> books = bookRepository.findAll();
        for(Book book: books) {
            if(book.getId().equals(bookId)) {
                if(book.getVotedUsers().contains(user)) {
                    List<User> votedUsers = book.getVotedUsers();
                    votedUsers.remove(user);
                    book.setVotedUsers(votedUsers);
                }
                book.setIsVotedByUser(false);
            } else {
                if(book.getVotedUsers().contains(user)) {
                    book.setIsVotedByUser(true);
                } else {
                    book.setIsVotedByUser(false);
                }
            }
        }
        return books;
    }
}
