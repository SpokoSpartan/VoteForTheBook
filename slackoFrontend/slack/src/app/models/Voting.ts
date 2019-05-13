import {Round} from './Round';
import {Book} from './Book';

export class Voting {
  firstRound: Round;
  secondRound: Round;
  thirdRound: Round;
  id: number;
  isActive: boolean;
  winner: Book;
  timeToNextVotingInSec: number;

  constructor(firstRound: Round, secondRound: Round, thirdRound: Round, id: number, isActive: boolean, winner: Book, timeToNextVotingInSec: number) {
    this.firstRound = firstRound;
    this.secondRound = secondRound;
    this.thirdRound = thirdRound;
    this.id = id;
    this.isActive = isActive;
    this.winner = winner;
    this.timeToNextVotingInSec = timeToNextVotingInSec;
  }
}
