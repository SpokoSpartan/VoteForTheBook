import {Component, HostListener, OnInit} from '@angular/core';
import {BookService} from '../../../services/book-service/book.service';
import {Book} from '../../../models/Book';
import {delay} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SnackbarService} from 'ngx-snackbar';
import {Voting} from '../../../models/Voting';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-present-book',
  templateUrl: './present-book.component.html',
  styleUrls: ['./present-book.component.css']
})
export class PresentBookComponent implements OnInit {

  books: Book[];
  innerWidth: any;
  bookWidth: any;
  bookHeight: any;
  margin: any;
  target: any;
  bookTitle: any = [];
  voting: Voting;
  timeToNextVoting: number;
  roundNumber: number;
  isVotingActive: boolean;
  subscription: Subscription;
  timeToPresentBooks = false;

  constructor(private bookService: BookService,
              private router: Router,
              private snackbarService: SnackbarService) {
  }

  source = interval(1000);

  async ngOnInit() {
    await this.getVoting().then( () => {
      this.sleep().then(() => this.setBookSize());
    });
  }

  async sleep() {
    await delay(5000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setBookSize();
  }

  setBookSize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 600) {
      this.bookWidth = this.innerWidth - 84;
      this.bookHeight = this.bookWidth * 1.28;
      this.margin = 13;
    } else if (this.innerWidth < 850) {
      this.bookWidth = (this.innerWidth - 262) / 2;
      this.bookHeight = this.bookWidth * 1.28;
      this.margin = 55;
    } else if (this.innerWidth < 1200) {
      this.bookWidth = (this.innerWidth - 420) / 3;
      this.bookHeight = this.bookWidth * 1.28;
      this.margin = 100;
    } else if (this.innerWidth < 1600) {
      this.bookWidth = (this.innerWidth - 488) / 4;
      this.bookHeight = this.bookWidth * 1.28;
      this.margin = 108;
    } else {
      this.bookWidth = (this.innerWidth - 656) / 5;
      this.bookHeight = this.bookWidth * 1.28;
      this.margin = 160;
    }
    this.cutTitle(this.bookWidth / 10);
    this.resizeImages();
  }

  resizeImages() {
    try {
      this.target = document.getElementById('row-for-books');
      this.target.style.marginLeft = Math.floor(this.margin) + 'px';
      this.target.style.marginRight = Math.floor(this.margin) + 'px';

      this.books.forEach(book => {
        let elementId;
        if (book.coverPictureUrl != null && book.coverPictureUrl !== '') {
          elementId = 'picture' + book.id;
        } else {
          elementId = 'defaultPicture' + book.id;
        }
        this.target = document.getElementById(elementId);
        this.target.style.width = (Math.floor(this.bookWidth) + 'px');
        this.target.style.height = (Math.floor(this.bookHeight) + 'px');
        this.target = document.getElementById('card' + book.id);
        this.target.style.width = (Math.floor(this.bookWidth + 34) + 'px');
      });
    } catch (e) {
      // not everyone books returned yet!!
    }
  }

  async getAllBooks() {
    const response: any = await this.bookService.getAllBook().catch((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('login');
      } else {
        this.addSnackbar(error.error.message, 4000, 'red');
      }
    });
    this.books = response;
    this.configureLastBook();
  }

  async getVoting() {
    this.timeToPresentBooks = false;
    this.books = [];
    const response: any = await this.bookService.getActualVoting().catch((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('login');
      } else {
        this.addSnackbar(error.error.message, 4000, 'red');
      }
    });
    this.voting = response;

    if (this.voting != null && this.voting.isActive) {
      if (this.voting.thirdRound.consideredBooks.length > 0) {
        this.books = this.voting.thirdRound.consideredBooks;
        this.roundNumber = 3;
      } else if (this.voting.secondRound.consideredBooks.length > 0) {
        this.books = this.voting.secondRound.consideredBooks;
        this.roundNumber = 2;
      } else {
        this.books = this.voting.firstRound.consideredBooks;
        this.roundNumber = 1;
      }
      this.timeToNextVoting = this.voting.timeToNextVotingInSec;
      this.bookService.setVotingStatus(true);
      if (this.subscription == null) {
        this.subscription = this.source.subscribe(() => this.setTimeToNextVoting());
      }
      await this.configureLastBook().then(() => this.isVotingActive = true);
    } else {
      if (this.subscription != null) {
        this.subscription.unsubscribe();
      }
      this.bookService.setVotingStatus(false);
      await this.getAllBooks();
      await this.configureLastBook().then(() => this.isVotingActive = false);
    }
  }

  setTimeToNextVoting() {
    if (this.timeToNextVoting <= 0) {
      this.getVoting();
    } else {
      this.timeToNextVoting = this.timeToNextVoting - 1;
    }
  }

  cutTitle(length: number) {
    this.bookTitle = [];
    if (this.books != null && this.books.length > 0) {
      this.books.forEach(book => {
        if (book.title.length > length) {
          this.bookTitle.push(book.title.substring(0, length) + '...');
        } else {
          this.bookTitle.push(book.title);
        }
      });
    }
  }

  async voteForBook(id: number) {
    await this.bookService.voteForBook(id).subscribe((response) => {
      const myBooks: Book[] = response;
      this.books = [];
      this.books = myBooks;
      this.configureLastBook();
    }, (error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('login');
      } else {
        this.addSnackbar(error.error.message, 4000, 'red');
      }
    });
  }

  async cancelVoteForBook(id: number) {
    await this.bookService.cancelVoteForBook(id).subscribe((response) => {
      const myBooks: Book[] = response;
      this.books = [];
      this.books = myBooks;
      this.configureLastBook();
    }, (error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('login');
      } else {
        this.addSnackbar(error.error.message, 4000, 'red');
      }
    });
  }

  initSize() {
    this.setBookSize();
  }

  async configureLastBook() {
    if (this.books != null && this.books.length > 0) {
      const book: Book = Object.assign({}, this.books[this.books.length - 1]);
      book.id = null;
      book.title = '';
      this.books.push(book);
      this.timeToPresentBooks = true;
    }
  }

  bookImageClicked(bookId: any) {
    this.router.navigateByUrl('book/' + bookId);
  }

  addSnackbar(message: string, time: number, col: string) {
    this.snackbarService.add({
      msg: message.bold(),
      timeout: time,
      action: {
        text: 'OK',
        onClick: (snack) => {
          this.snackbarService.clear();
        }
      },
      color: col,
      background: 'Silver'
    });
  }
  clearSnackbar() {
    this.snackbarService.clear();
  }
}
