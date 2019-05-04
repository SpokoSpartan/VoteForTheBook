import {Component, HostListener, OnInit} from '@angular/core';
import {BookService} from '../../../services/book-service/book.service';
import {Book} from '../../../models/Book';
import {delay} from 'rxjs/operators';

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

  constructor(private bookService: BookService) {
  }

  async ngOnInit() {
    await this.getAllBooks().then( () => {
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
    this.cutTitle(this.bookWidth / 9);
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
    this.books = [];
    try {
      const response: any = await this.bookService.getAllBook();
      this.books = response;
      this.configureLastBook();
    } catch (e) {
      console.log(e);
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
    try {
      await this.bookService.voteForBook(id).subscribe((response) => {
        const myBooks: Book[] = response;
        this.books = [];
        this.books = myBooks;
        this.configureLastBook();
      });
    } catch (e) {
      console.log('jestem');
      console.log(e.error.message);
    }
  }

  async cancelVoteForBook(id: number) {
    try {
      await this.bookService.cancelVoteForBook(id).subscribe((response) => {
        const myBooks: Book[] = response;
        this.books = [];
        this.books = myBooks;
        this.configureLastBook();
      });
    } catch (e) {
      console.log(e);
    }
  }

  initSize() {
    this.setBookSize();
  }

  configureLastBook() {
    if (this.books != null && this.books.length > 0) {
      const book: Book = Object.assign({}, this.books[this.books.length - 1]);
      book.id = null;
      this.books.push(book);
    }
  }
}
