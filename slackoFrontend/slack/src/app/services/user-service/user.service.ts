import { Injectable } from '@angular/core';
import {API_URL} from '../../config';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {UserDTO} from '../../models/DTOs/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = API_URL + '/api/v1/user';

  constructor(private http: HttpClient) {
  }

  createUser(item: UserDTO): Observable<any> {
    return this.http.post<any>(this.URL + '/create', item, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `exception was: ${error.error.message}`);
    }
    return throwError(error);
  }
}
