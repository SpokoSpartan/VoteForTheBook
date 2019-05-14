import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../services/book-service/book.service';
import {Book} from '../../../models/Book';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../../services/login-service/login.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookId: string;
  isWinnerPresented = false;
  isBookLoaded = false;
  book: Book;
  isLoggedIn = false;
  presentMoreInfo = false;
  buttonText = 'more info';

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getIsLoggedOk().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn) {
      this.bookId = this.route.snapshot.paramMap.get('bookId');
      if (this.bookId === null) {
        this.bookId = sessionStorage.getItem('winner_id');
        sessionStorage.removeItem('winner_id');
        this.isWinnerPresented = true;
      }
      this.initBooks().then(() => this.isBookLoaded = true);
    } else {
      this.router.navigateByUrl('login');
    }
  }

  async initBooks() {
    const response: any = await this.bookService.getOneBook(this.bookId).catch((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('login');
      }});
    this.book = response;
  }

  backToBooksButtonClicked() {
    this.router.navigateByUrl('present-books');
  }

  cutDescription(description: string): string {
    if (description.length > 420 && !this.presentMoreInfo) {
      return description.substring(0, 420) + '...';
    } else {
      return description;
    }
  }

  isMoreButtonActive(description: string): boolean {
    if (description.length > 420) {
      return true;
    }
    return false;
  }

  moreInfoButtonClicked() {
    if (this.presentMoreInfo === false) {
      this.presentMoreInfo = true;
      this.buttonText = 'less info';
    } else {
      this.presentMoreInfo = false;
      this.buttonText = 'more info';
    }
  }
}
