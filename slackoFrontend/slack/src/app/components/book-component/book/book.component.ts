import { Component, OnInit } from '@angular/core';
import {BookService} from '../../../services/book-service/book.service';
import {Book} from '../../../models/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService: BookService) { }

  books: Book[] = [];

  ngOnInit() {
    this.initBooks();
  }

  async initBooks() {
    const response: any = await this.bookService.getAllBook();
    this.books = response;
    console.log(this.books);
  }
}
