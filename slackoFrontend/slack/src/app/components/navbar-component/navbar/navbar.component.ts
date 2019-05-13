import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login-service/login.service';
import {BookService} from '../../../services/book-service/book.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService,
              private bookService: BookService) { }

  isLoggedIn = false;
  username = 'Not logged in';
  role = '';
  isVotingActive = true;

  ngOnInit() {
    this.loginService.getIsLoggedOk().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.loginService.getRole().subscribe(role => {
      this.role = role;
    });
    this.loginService.getUsername().subscribe(username => {
      this.username = username;
    });
    this.bookService.getIsVotingActive().subscribe(isVotingActive => {
      this.isVotingActive = isVotingActive;
    });
  }

  startVoteButtonClicked() {
    this.router.navigateByUrl('new-voting');
  }

  getLastWinner() {
    this.router.navigateByUrl('winner');
  }

  signUpButtonClicked() {
    this.router.navigateByUrl('registration');
  }

  signInButtonClicked() {
    this.router.navigateByUrl('login');
  }

  logoutButtonClicked() {
    this.loginService.logoutUser();
  }

  voteButtonClicked() {
    this.router.navigateByUrl('present-books');
  }

  createBookButtonClicked() {
    this.router.navigateByUrl('create-book');
  }

}
