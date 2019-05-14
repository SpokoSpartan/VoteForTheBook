import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../../services/book-service/book.service';
import {VotingDTO} from '../../../models/DTOs/VotingDTO';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login-service/login.service';

@Component({
  selector: 'app-new-voting',
  templateUrl: './new-voting.component.html',
  styleUrls: ['./new-voting.component.css']
})
export class NewVotingComponent implements OnInit {

  startVotingParams: FormGroup;
  isLoggedIn = false;

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getIsLoggedOk().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn) {
      this.initFormGroup();
    } else {
      this.router.navigateByUrl('login');
    }
  }

  initFormGroup() {
    this.startVotingParams = this.formBuilder.group({
      timeOfRound: ['', [Validators.required, Validators.max(10), Validators.min(1)]]
    });
  }

  startVotingButtonClicked() {
    const voting: VotingDTO = new VotingDTO(this.startVotingParams.value.timeOfRound);
    this.bookService.createVoting(voting).subscribe((response) => {
      if (response != null) {
        this.router.navigateByUrl('present-books');
      }
    });
  }
}
