import { Component, OnInit } from '@angular/core';
import {Book} from '../../../../models/Book';
import {BookService} from '../../../../services/book-service/book.service';
import {LoginService} from '../../../../services/login-service/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

  book: Book = null;
  isLoggedIn = false;

  constructor(private bookService: BookService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.loginService.getIsLoggedOk().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn) {
      this.getWinner();
    } else {
      this.router.navigateByUrl('login');
    }
  }

  async getWinner() {
    const response = await this.bookService.getActualVoting();
    if (response.winner !== null) {
      this.book = response.winner;
      if (this.book !== null) {
        sessionStorage.setItem('winner_id', this.book.id.toString());
      } else {
        sessionStorage.setItem('winner_id', '0');
      }
    } else {
      sessionStorage.setItem('winner_id', '0');
    }
  }
}
