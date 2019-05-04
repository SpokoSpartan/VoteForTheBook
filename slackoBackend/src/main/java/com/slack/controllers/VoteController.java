package com.slack.controllers;

import static com.slack.utils.Mapping.*;

import com.slack.entities.Book;
import com.slack.services.VoteServices;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_VERSION + VOTE)
public class VoteController {

    private final VoteServices voteServices;

    @PostMapping(ADD_VOTE_FOR)
    public List<Book> voteForBook(@PathVariable Long bookId) {
        return voteServices.voteForBook(bookId);
    }

    @PostMapping(REMOVE_VOTE_FROM)
    public List<Book> removeVoteFromBook(@PathVariable Long bookId) {
        return voteServices.removeVoteFromBook(bookId);
    }
}
