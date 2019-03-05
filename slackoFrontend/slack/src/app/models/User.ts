import {UserDTO} from './DTOs/UserDTO';

export class User {
  id: number;
  email: string;
  nickName: string;
  constructor(userDTO: UserDTO, id: number) {
    this.email = userDTO.email;
    this.nickName = userDTO.nickName;
    this.id = id;
  }
}
