import {Injectable} from '@angular/core';
import {API_URL} from '../../config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../../models/Book';
import {BookDTO} from '../../models/DTOs/BookDTO';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  URL = API_URL + '/api/v1/book';


  constructor(private http: HttpClient,
              private router: Router) {
  }

  async getBooksDTOByIsbn(isbn: string) {
    return await this.http.get<BookDTO>(this.URL + '/get-by-isbn/' + isbn, {withCredentials: true}).toPromise();
  }

  async getAllBook() {
    try {
      return await this.http.get<Book>(this.URL + '/getAll/books', {withCredentials: true}).toPromise();
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('login');
      }
    }
  }

  createBook(item: BookDTO): Observable<any> {
    return this.http.post<Book>(this.URL + '/create', item, { withCredentials: true });
  }

  updateBook(id: number, item: BookDTO) {
    return this.http.post<Book>(this.URL + '/update/' + id, item, { withCredentials: true });
  }

  removeBook(id: number) {
    return this.http.delete<Book>(this.URL + '/remove' + id, { withCredentials: true });
  }
}
