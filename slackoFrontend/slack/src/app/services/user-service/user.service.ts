import { Injectable } from '@angular/core';
import {RestService} from '../rest-service/rest.service';
import {UserDTO} from '../../models/DTOs/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private restService: RestService) { }

  async createUser(user: UserDTO) {
    this.restService.post('user/create', user).subscribe();
  }
}
