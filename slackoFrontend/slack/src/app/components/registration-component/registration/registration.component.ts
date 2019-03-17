import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDTO} from '../../../models/DTOs/UserDTO';
import {UserService} from '../../../services/user-service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  registrationParams: FormGroup;

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.registrationParams = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.required, Validators.minLength(7)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  registrationButtonClicked(registrationParams: any) {
    const userDTO = new UserDTO(this.registrationParams.value.nickname,
      this.registrationParams.value.email, this.registrationParams.value.password);
    this.userService.createUser(userDTO).subscribe((response) => {
      if (response !== null) {
        this.router.navigateByUrl('login');
      }
    });
  }
}
