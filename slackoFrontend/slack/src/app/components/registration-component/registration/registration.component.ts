import { Component, OnInit } from '@angular/core';
import {BookService} from '../../../services/book-service/book.service';
import {UserDTO} from '../../../models/DTOs/UserDTO';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userDto: UserDTO;

  constructor(private userService: BookService) {

    this.userDto.nickName = 'Koks2000';
    this.userDto.email = 'wojtekspoton@gmail.com';
    this.userDto.password = 'tygrysek15';
  }


  ngOnInit() {
  }

}
