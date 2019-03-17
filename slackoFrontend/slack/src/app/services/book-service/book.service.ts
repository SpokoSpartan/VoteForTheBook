import { Injectable } from '@angular/core';
import {API_URL} from '../../config';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Book} from '../../models/Book';
import {BookDTO} from '../../models/DTOs/BookDTO';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  URL = API_URL + '/api/v1/book';

  constructor(private http: HttpClient) {
  }

  async getBooksDTOByIsbn(isbn: string) {
    return await this.http.get<BookDTO>(this.URL + '/get-by-isbn/' + isbn, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  async getAllBook() {
    return await this.http.get<Book>(this.URL + '/getAll/null', { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  createBook(item: BookDTO): Observable<any> {
    return this.http.post<Book>(this.URL + '/create', item, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBook(id: number, item: BookDTO) {
    return this.http.post<Book>(this.URL + '/update/' + id, item, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  removeBook(id: number) {
    return this.http.delete<Book>(this.URL + '/remove' + id, { withCredentials: true })
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
