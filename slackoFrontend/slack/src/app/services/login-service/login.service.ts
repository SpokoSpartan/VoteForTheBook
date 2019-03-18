import { Injectable } from '@angular/core';
import {API_URL} from '../../config';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = API_URL;

  constructor(private http: HttpClient,
              private router: Router) {
    this.tasks.next(false);
  }

  private tasks: BehaviorSubject<any> = new BehaviorSubject([]);

  getIsLoggedOk() {
    return this.tasks.asObservable();
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
      this.tasks.next(true);
    }
    return isStatusOk;
  }

  async logoutUser() {
    let isStatusOk = true;
    await this.http.post<any>(this.URL + '/logout', null, { withCredentials: true }).toPromise().catch((e: HttpErrorResponse) => {
      isStatusOk = false;
    });
    if (isStatusOk === true) {
      this.tasks.next(false);
      this.router.navigateByUrl('login');
    }
  }
}
