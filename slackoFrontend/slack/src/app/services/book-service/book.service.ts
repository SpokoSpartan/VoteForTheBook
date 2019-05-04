import {Injectable} from '@angular/core';
import {API_URL} from '../../config';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Book} from '../../models/Book';
import {BookDTO} from '../../models/DTOs/BookDTO';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  URL = API_URL + '/api/v1';


  constructor(private http: HttpClient,
              private router: Router) {
  }

  async getBooksDTOByIsbn(isbn: string) {
    return await this.http.get<BookDTO>(this.URL + '/book/get-by-isbn/' + isbn, {withCredentials: true}).toPromise();
  }

  async getAllBook() {
    try {
      return await this.http.get<Book>(this.URL + '/book/getAll/books', {withCredentials: true}).toPromise();
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('login');
      } else {
        throwError(error);
      }
    }
  }

  createBook(item: BookDTO): Observable<any> {
    try {
      return this.http.post<Book>(this.URL + '/book/create', item, { withCredentials: true });
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('login');
      } else {
        throwError(error);
      }
    }
  }

  voteForBook(bookId: number): Observable<Book[]> {
    try {
      return this.http.post<any>(this.URL + '/vote/add/for/' + bookId, null, {withCredentials: true});
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('login');
      } else {
        throw error;
      }
    }
  }

  cancelVoteForBook(bookId: number): Observable<Book[]> {
    try {
      return this.http.post<any>(this.URL + '/vote/remove/from/' + bookId, null, {withCredentials: true});
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('login');
      } else {
        throwError(error);
      }
    }
  }

  updateBook(id: number, item: BookDTO) {
    return this.http.post<Book>(this.URL + '/book/update/' + id, item, { withCredentials: true });
  }

  removeBook(id: number) {
    return this.http.delete<Book>(this.URL + '/book/remove' + id, { withCredentials: true });
  }
}
