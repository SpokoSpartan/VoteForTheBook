import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {BookService} from '../../../services/book-service/book.service';
import {Book} from '../../../models/Book';
import {delay} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SnackbarService} from 'ngx-snackbar';
import {Voting} from '../../../models/Voting';
import {interval, Subscription} from 'rxjs';
import {LoginService} from '../../../services/login-service/login.service';

@Component({
  selector: 'app-present-book',
  templateUrl: './present-book.component.html',
  styleUrls: ['./present-book.component.css']
})
export class PresentBookComponent implements OnInit {

  books: Book[];
  pointerToCotTitle = 1;
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
  source = interval(1000);
  isLoggedIn = false;

  constructor(private bookService: BookService,
              private router: Router,
              private snackbarService: SnackbarService,
              private loginService: LoginService,
              private cdref: ChangeDetectorRef) {
  }

  async ngOnInit() {
    this.loginService.getIsLoggedOk().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn) {
      await this.getVoting().then( () => {
        this.sleep().then(() => this.setBookSize());
      });
    } else {
      this.router.navigateByUrl('login');
    }
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
      const booksCount = this.books.length;
      if (booksCount < 4) {
        this.margin = (this.innerWidth - ((this.bookWidth + 79) * (booksCount - 1))) / 2 ;
      }
    } else if (this.innerWidth < 1600) {
      this.bookWidth = (this.innerWidth - 488) / 4;
      this.bookHeight = this.bookWidth * 1.28;
      this.margin = 108;
      const booksCount = this.books.length;
      if (booksCount < 5) {
        this.margin = (this.innerWidth - ((this.bookWidth + 75) * (booksCount - 1))) / 2 ;
      }
    } else {
      this.bookWidth = (this.innerWidth - 656) / 5;
      this.bookHeight = this.bookWidth * 1.28;
      this.margin = 160;
      const booksCount = this.books.length;
      if (booksCount < 6) {
        this.margin = (this.innerWidth - ((this.bookWidth + 75) * (booksCount - 1))) / 2 ;
      }
    }
    this.pointerToCotTitle = this.bookWidth / 10;
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
    this.sortBooks();
    this.configureLastBook();
  }

  async getVoting() {
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
        this.sortBooks();
        this.roundNumber = 3;
      } else if (this.voting.secondRound.consideredBooks.length > 0) {
        this.books = this.voting.secondRound.consideredBooks;
        this.sortBooks();
        this.roundNumber = 2;
      } else {
        this.books = this.voting.firstRound.consideredBooks;
        this.sortBooks();
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

  sortBooks() {
    this.books.sort((book1, book2) => {
      if (book1.id > book2.id) {
        return 1;
      } else if (book1.id < book2.id) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  setTimeToNextVoting() {
    if (this.timeToNextVoting <= 0) {
      this.timeToPresentBooks = false;
      this.getVoting().catch((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigateByUrl('login');
        } else {
          this.addSnackbar(error.error.message, 4000, 'red');
        }
      });
    } else {
      this.timeToNextVoting = this.timeToNextVoting - 1;
    }
  }

  cutTitle(title: string): string {
    if (title.length > this.pointerToCotTitle) {
      return title.substring(0, this.pointerToCotTitle) + '...';
    } else {
      return title;
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
      this.books = response;
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
    if (this.books != null && this.books.length > 0 && this.books[this.books.length - 1].id !== null) {
      const book: Book = Object.assign({}, this.books[this.books.length - 1]);
      book.id = null;
      book.title = 'title';
      this.books.push(book);
      this.timeToPresentBooks = true;
      this.cdref.detectChanges();
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
