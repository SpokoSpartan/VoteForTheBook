import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../../services/book-service/book.service';
import {VotingDTO} from '../../../models/DTOs/VotingDTO';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-voting',
  templateUrl: './new-voting.component.html',
  styleUrls: ['./new-voting.component.css']
})
export class NewVotingComponent implements OnInit {

  startVotingParams: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService,
              private router: Router) { }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.startVotingParams = this.formBuilder.group({
      timeOfRound: ['', [Validators.required, Validators.max(10), Validators.min(1)]]
    });
  }

  startVotingButtonClicked() {
    const voting: VotingDTO = new VotingDTO(this.startVotingParams.value.timeOfRound);
    this.bookService.createVoting(voting).subscribe(response => {
      if (response != null) {
        this.router.navigateByUrl('present-books');
      }
    });
  }
}
