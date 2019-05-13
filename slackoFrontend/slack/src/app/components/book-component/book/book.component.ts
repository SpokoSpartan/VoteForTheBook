import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../services/book-service/book.service';
import {Book} from '../../../models/Book';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookId: string;
  isWinnerPresented = false;
  isBookLoaded = false;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router) { }

  book: Book;

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    if (this.bookId === null) {
      this.bookId = sessionStorage.getItem('winner_id');
      sessionStorage.removeItem('winner_id');
      this.isWinnerPresented = true;
    }
    this.initBooks().then(() => this.isBookLoaded = true);
  }

  async initBooks() {
    const response: any = await this.bookService.getOneBook(this.bookId);
    this.book = response;
  }

  backToBooksButtonClicked() {
    console.log('fdksj');
    this.router.navigateByUrl('present-books');
  }
}
