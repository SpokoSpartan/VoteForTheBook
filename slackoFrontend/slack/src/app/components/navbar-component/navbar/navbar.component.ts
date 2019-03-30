import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login-service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) { }

  isLoggedIn = false;
  username = 'Not logged in';
  role = '';

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
