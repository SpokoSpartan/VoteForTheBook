import { Injectable } from '@angular/core';
import {API_URL} from '../../config';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = API_URL;

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
    this.loggedIn.next(false);
    this.getUserCredential();
    this.isLoggedInCorrectly();
  }

  private loggedIn: BehaviorSubject<any> = new BehaviorSubject([]);
  private role: BehaviorSubject<any> = new BehaviorSubject([]);
  private username: BehaviorSubject<any> = new BehaviorSubject([]);


  getIsLoggedOk() {
    return this.loggedIn.asObservable();
  }
  getRole() {
    return this.role.asObservable();
  }
  getUsername() {
    return this.username.asObservable();
  }
  isLoggedInCorrectly() {
    if (this.role.getValue() === '[ROLE_USER]') {
      this.loggedIn.next(true);
    }
  }

  async loginUser(username: string, password: string) {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    let isStatusOk = true;
    await this.http.post<any>(this.URL + '/login', body, { withCredentials: true }).toPromise().catch((e: HttpErrorResponse) => {
        isStatusOk = false;
    });
    if (isStatusOk === true) {
      this.loggedIn.next(true);
    } else {
      this.cookieService.delete('dX-Nlcl-JvbG-Vz');
    }
    this.getUserCredential();
    return isStatusOk;
  }

  getUserCredential() {
    const principal: string[] = atob(this.cookieService.get('dX-Nlcl-JvbG-Vz')).split(';');
    if (principal[0] != null && principal[1] != null) {
      this.role.next(principal[1]);
      this.username.next('Logged as: ' + principal[0]);
    } else {
      this.role.next('null');
      this.username.next('Not logged in');
    }
  }

  async logoutUser() {
    let isStatusOk = true;
    await this.http.post<any>(this.URL + '/logout', null, { withCredentials: true }).toPromise().catch((e: HttpErrorResponse) => {
      isStatusOk = false;
    });
    if (isStatusOk === true) {
      this.loggedIn.next(false);
      this.cookieService.delete('dX-Nlcl-JvbG-Vz');
      this.router.navigateByUrl('login');
    }
    this.getUserCredential();
  }
}
