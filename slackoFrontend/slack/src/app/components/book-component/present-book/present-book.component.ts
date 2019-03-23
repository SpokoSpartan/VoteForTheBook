import { Component, OnInit } from '@angular/core';
import {BookService} from '../../../services/book-service/book.service';
import {Book} from '../../../models/Book';

@Component({
  selector: 'app-present-book',
  templateUrl: './present-book.component.html',
  styleUrls: ['./present-book.component.css']
})
export class PresentBookComponent implements OnInit {

  constructor(private bookService: BookService) { }

  books: Book[];

  ngOnInit() {
    this.getAllBooks();
  }

  async getAllBooks() {
    this.books = [];
    const response: any = await this.bookService.getAllBook();
    this.books = response;
    console.log(this.books);
  }
}
