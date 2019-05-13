package com.slack.repositories;

import com.slack.entities.Voting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface VotingRepository extends JpaRepository<Voting, Long> {

    @Query(value = "SELECT v.* FROM voting v WHERE (SELECT r.id FROM round r WHERE ?1 " +
            "BETWEEN beginning_date AND finish_date) IN (first_round, second_round, third_round);",
            nativeQuery = true)
    Voting getVotingByDate(Date date);

    @Query(value = "SELECT v.* FROM voting v WHERE (SELECT r.id FROM round r ORDER BY finish_date " +
            "DESC LIMIT 1) IN (first_round, second_round, third_round);", nativeQuery = true)
    Voting getLastVoting();
}
