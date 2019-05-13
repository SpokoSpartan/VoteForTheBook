package com.slack.services;

import com.slack.DTOs.VotingDTO;
import com.slack.entities.Book;
import com.slack.entities.Round;
import com.slack.entities.User;
import com.slack.entities.Voting;
import com.slack.exceptions.ValidationException;
import com.slack.repositories.BookRepository;
import com.slack.repositories.VotingRepository;
import com.slack.utils.Constans;
import lombok.RequiredArgsConstructor;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class VoteServices {

    private final UserService userService;
    private final BookRepository bookRepository;
    private final VotingRepository votingRepository;

    public Voting createVoting(VotingDTO votingDTO) {
        if(votingRepository.getVotingByDate(new Date()) != null) {
            throw new ValidationException("Sorry, you can't create a voting now." +
                    " Other is currently taking place.");
        }
        Voting voting = votingRepository.getLastVoting();
        if(voting != null && voting.getWinner() == null) {
            voting.setWinner(getWinnerFromVoting(voting));
            votingRepository.save(voting);
        }
        List<Book> books = bookRepository.findAll();
        books.forEach(book -> book.setVotedUsers(new ArrayList<>()));
        books = bookRepository.saveAll(books);
        voting = new Voting();
        DateTime beginningDate = new DateTime();
        Round firstRound = new Round();
        firstRound.setBeginningDate(beginningDate.toDate());
        firstRound.setConsideredBooks(books);
        firstRound.setFinishDate(beginningDate.plusMinutes(votingDTO.getTimeIntervalInSec()).toDate());
        firstRound.setIsInitialized(true);
        voting.setFirstRound(firstRound);
        for (Book book: voting.getFirstRound().getConsideredBooks()) {
            book.setIsVotedByUser(false);
        }
        Integer finishTimeInSec = new DateTime(voting.getFirstRound().getFinishDate()).getSecondOfDay();
        Integer actualTimeInSec = beginningDate.getSecondOfDay();
        voting.setTimeToNextVotingInSec((finishTimeInSec - actualTimeInSec) + 1);
        Round secondRound = new Round();
        secondRound.setBeginningDate(beginningDate.plusMinutes(votingDTO.getTimeIntervalInSec()).toDate());
        secondRound.setFinishDate(beginningDate.plusMinutes(votingDTO.getTimeIntervalInSec() * 2).toDate());
        secondRound.setIsInitialized(false);
        voting.setSecondRound(secondRound);
        Round thirdRound = new Round();
        thirdRound.setBeginningDate(beginningDate.plusMinutes(votingDTO.getTimeIntervalInSec() * 2).toDate());
        thirdRound.setFinishDate(beginningDate.plusMinutes(votingDTO.getTimeIntervalInSec() * 3).toDate());
        thirdRound.setIsInitialized(false);
        voting.setThirdRound(thirdRound);
        voting = votingRepository.save(voting);
        voting.setIsActive(true);
        return voting;
    }

    @Transactional
    public Voting getLastVoting() {
        User user = userService.getLoggedInUser();
        Voting voting = votingRepository.getVotingByDate(new Date());
        if(voting != null) {
            voting.setIsActive(true);
            checkIfNotInitialized(voting);
            isUserVotingForBook(voting.getFirstRound().getConsideredBooks(), user);
            isUserVotingForBook(voting.getSecondRound().getConsideredBooks(), user);
            isUserVotingForBook(voting.getThirdRound().getConsideredBooks(), user);
            return voting;
        }
        voting = votingRepository.getLastVoting();
        if(voting != null) {
            voting.setIsActive(false);
            if(voting.getWinner() == null) {
                voting.setWinner(getWinnerFromVoting(voting));
                votingRepository.save(voting);
            }
        }
        return voting;
    }

    @Transactional
    public List<Book> voteForBook(Long bookId) {
        User user = userService.getLoggedInUser();
        Voting voting = votingRepository.getVotingByDate(new Date());
        List<Book> books = getBooksToVote(voting, user, true);
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
        Voting voting = votingRepository.getVotingByDate(new Date());
        List<Book> books = getBooksToVote(voting, user, false);
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

    private Book getWinnerFromVoting(Voting voting) {
        List<Book> books = voting.getThirdRound().getConsideredBooks();
        if(books == null || books.isEmpty()) {
            return null;
        }
        Book winner = books.get(0);
        for(Book book : books) {
            if(book.getVotedUsers().size() > winner.getVotedUsers().size()) {
                winner = book;
            }
        }
        return winner;
    }

    private void isUserVotingForBook(List<Book> books, User user) {
        if(books == null || books.isEmpty())
            return;
        for (Book book: books) {
            if(book.getVotedUsers().contains(user)){
                book.setIsVotedByUser(true);
            }
            else {
                book.setIsVotedByUser(false);
            }
        }
    }

    private List<Book> getBooksToVote(Voting voting, User user, boolean isVoting) {
        if(voting == null) {
            throw new ValidationException("There aren't any voting");
        }
        List<Book> books = null;
        Integer numberOfVoting = null;
        for (Map.Entry<Integer, List<Book>> entry: getBooksForVotingAsMap(voting).entrySet()) {
            books = entry.getValue();
            numberOfVoting = entry.getKey();
        }
        if(bookRepository.countBookByVotedUsers(user) > (Constans.MAX_COUNT_OF_FIRST_VOTING / numberOfVoting)- 2 && isVoting) {
            throw new ValidationException("You can vote for max  " +
                    ((Constans.MAX_COUNT_OF_FIRST_VOTING / numberOfVoting) - 1) + " books");
        }
        return books;
    }

    private Map<Integer, List<Book>> getBooksForVotingAsMap(Voting voting) {
        if(!voting.getThirdRound().getConsideredBooks().isEmpty()) {
            return new HashMap(){{put(3, voting.getThirdRound().getConsideredBooks());}};
        }
        if(!voting.getSecondRound().getConsideredBooks().isEmpty()) {
            return new HashMap(){{put(2, voting.getSecondRound().getConsideredBooks());}};
        }
        if(!voting.getFirstRound().getConsideredBooks().isEmpty()) {
            return new HashMap(){{put(1, voting.getFirstRound().getConsideredBooks());}};
        }
        throw new ValidationException("No books to vote.");
    }

    private boolean checkIfNotInitialized(Voting voting) {
        Date date = new Date();
        if(isRoundActive(voting.getFirstRound(), date)) {
            Integer finishTimeInSec = new DateTime(voting.getFirstRound().getFinishDate()).getSecondOfDay();
            Integer actualTimeInSec = new DateTime(date).getSecondOfDay();
            voting.setTimeToNextVotingInSec((finishTimeInSec - actualTimeInSec) + 1);
            return false;
        }
        else if(isRoundActive(voting.getSecondRound(), date)) {
            Integer finishTimeInSec = new DateTime(voting.getSecondRound().getFinishDate()).getSecondOfDay();
            Integer actualTimeInSec = new DateTime(date).getSecondOfDay();
            voting.setTimeToNextVotingInSec((finishTimeInSec - actualTimeInSec) + 1);
            if(!voting.getSecondRound().getIsInitialized()) {
                initializeVoting(voting.getSecondRound(), voting.getFirstRound(), Constans.MAX_COUNT_OF_FIRST_VOTING / 2);
                voting.getFirstRound().getConsideredBooks().forEach(book -> book.setVotedUsers(new ArrayList<>()));
                return true;
            }
            return false;
        }
        else if(isRoundActive(voting.getThirdRound(), date)) {
            Integer finishTimeInSec = new DateTime(voting.getThirdRound().getFinishDate()).getSecondOfDay();
            Integer actualTimeInSec = new DateTime(date).getSecondOfDay();
            voting.setTimeToNextVotingInSec((finishTimeInSec - actualTimeInSec) + 1);
            if(!voting.getThirdRound().getIsInitialized()){
                initializeVoting(voting.getThirdRound(), voting.getSecondRound(), Constans.MAX_COUNT_OF_FIRST_VOTING / 3);
                voting.getSecondRound().getConsideredBooks().forEach(book -> book.setVotedUsers(new ArrayList<>()));
                return true;
            }
            return false;
        }
        voting.setTimeToNextVotingInSec(0);
        return false;
    }

    private Boolean isRoundActive(Round round, Date date) {
        if(round.getBeginningDate().compareTo(date) < 0 && round.getFinishDate().compareTo(date) > 0) {
            return true;
        }
        return false;
    }

    private void initializeVoting(Round round, Round prevRound, Integer maxNumberOfBooks) {
        round.setIsInitialized(true);
        prevRound.getConsideredBooks().sort(new Comparator<Book>() {
            @Override
            public int compare(Book book, Book t1) {
                if(book.getVotedUsers().size() >= t1.getVotedUsers().size()) {
                    return -1;
                }
                return 1;
            }
        });
        LinkedList<Book> consideredBooks = new LinkedList<>();
        for(Book book: prevRound.getConsideredBooks()) {
            if(consideredBooks.size() < maxNumberOfBooks) {
                consideredBooks.addLast(book);
            }
        }
        round.setConsideredBooks(consideredBooks);
    }
}
