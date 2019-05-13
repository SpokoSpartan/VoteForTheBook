import {Book} from './Book';

export class Round {
  beginningDate: Date;
  consideredBooks: Book[];
  finishDate:	Date;
  id:	number;
  isInitialized: boolean;

  constructor(beginningDate: Date, consideredBooks: Book[], finishDate: Date, id: number, isInitialized: boolean) {
    this.beginningDate = beginningDate;
    this.consideredBooks = consideredBooks;
    this.finishDate = finishDate;
    this.id = id;
    this.isInitialized = isInitialized;
  }
}
