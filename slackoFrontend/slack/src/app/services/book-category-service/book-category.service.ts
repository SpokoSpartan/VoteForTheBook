import { Injectable } from '@angular/core';
import {API_URL} from '../../config';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BookCategory} from '../../models/BookCategory';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {

  URL = API_URL + '/api/v1/book-category';

  constructor(private http: HttpClient) {
  }

  async getAllBookCategories() {
    return await this.http.get<BookCategory>(this.URL + '/getAll/null', { withCredentials: true })
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
  }}
