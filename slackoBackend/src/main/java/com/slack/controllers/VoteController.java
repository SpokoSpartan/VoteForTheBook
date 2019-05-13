package com.slack.controllers;

import static com.slack.utils.Mapping.*;

import com.slack.DTOs.VotingDTO;
import com.slack.entities.Book;
import com.slack.entities.Voting;
import com.slack.services.VoteServices;
import com.slack.validators.DTOValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_VERSION + VOTE)
public class VoteController {

    private final VoteServices voteServices;

    @PostMapping(CREATE)
    public Voting createVoting(@RequestBody @Valid VotingDTO votingDTO, BindingResult bindingResult) {
        DTOValidator.validate(bindingResult);
        return voteServices.createVoting(votingDTO);
    }

    @GetMapping(GET_ALL)
    public Voting getLastVoting(){
        return voteServices.getLastVoting();
    }

    @PostMapping(ADD_VOTE_FOR)
    public List<Book> voteForBook(@PathVariable Long bookId) {
        return voteServices.voteForBook(bookId);
    }

    @PostMapping(REMOVE_VOTE_FROM)
    public List<Book> removeVoteFromBook(@PathVariable Long bookId) {
        return voteServices.removeVoteFromBook(bookId);
    }
}
