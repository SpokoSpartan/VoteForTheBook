import { Injectable } from '@angular/core';
import {API_URL} from '../../config';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Author} from '../../models/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  URL = API_URL + '/api/v1/author';

  constructor(private http: HttpClient) {
  }

  async getAllAuthors() {
    return await this.http.get<Author>(this.URL + '/getAll/null', { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      ).toPromise();
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
