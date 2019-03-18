import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../services/login-service/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  loginParams: FormGroup;
  isLoggedOk = true;

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.loginParams = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async loginButtonClicked(registrationParams: any) {
    const isStatusOk = await this.loginService.loginUser(this.loginParams.value.email, this.loginParams.value.password)
    if (isStatusOk === true) {
      this.router.navigateByUrl('create-book');
    } else {
      this.isLoggedOk = false;
    }
  }
}
