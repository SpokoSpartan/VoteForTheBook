import { Component, OnInit } from '@angular/core';
import {Book} from '../../../../models/Book';
import {BookService} from '../../../../services/book-service/book.service';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

  book: Book = null;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getWinner();
  }

  async getWinner() {
    const response = await this.bookService.getActualVoting();
    if (response.winner !== null) {
      this.book = response.winner;
      sessionStorage.setItem('winner_id', this.book.id.toString());
    }
  }
}
