export class UserDTO {
  nickName: string;
  email: string;
  password: string;
  constructor(nickName: string, email: string, password: string) {
    this.email = email;
    this.password = password;
    this.nickName = nickName;
  }
}
