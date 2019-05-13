import {Injectable} from '@angular/core';
import {API_URL} from '../../config';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from '../../models/Book';
import {BookDTO} from '../../models/DTOs/BookDTO';
import {Voting} from '../../models/Voting';
import {VotingDTO} from '../../models/DTOs/VotingDTO';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  URL = API_URL + '/api/v1';

  private isVotingActive: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.isVotingActive.next(false);
  }
  setVotingStatus(status: boolean) {
    this.isVotingActive.next(status);
  }

  getIsVotingActive() {
    return this.isVotingActive.asObservable();
  }

  async getBooksDTOByIsbn(isbn: string) {
    return await this.http.get<BookDTO>(this.URL + '/book/get-by-isbn/' + isbn, {withCredentials: true}).toPromise();
  }

  async getAllBook() {
    return await this.http.get<Book>(this.URL + '/book/getAll/books', {withCredentials: true}).toPromise();
  }

  async getActualVoting() {
    return await this.http.get<Voting>(this.URL + '/vote/getAll/last', {withCredentials: true}).toPromise();
  }

  createVoting(votingDTO: VotingDTO): Observable<Voting> {
    return this.http.post<any>(this.URL + '/vote/create', votingDTO, {withCredentials: true});
  }

  createBook(item: BookDTO): Observable<any> {
    return this.http.post<Book>(this.URL + '/book/create', item, {withCredentials: true});
  }

  voteForBook(bookId: number): Observable<Book[]> {
    return this.http.post<any>(this.URL + '/vote/add/for/' + bookId, null, {withCredentials: true});
  }

  cancelVoteForBook(bookId: number): Observable<Book[]> {
    return this.http.post<any>(this.URL + '/vote/remove/from/' + bookId, null, {withCredentials: true});
  }

  updateBook(id: number, item: BookDTO) {
    return this.http.post<Book>(this.URL + '/book/update/' + id, item, {withCredentials: true});
  }

  removeBook(id: number) {
    return this.http.delete<Book>(this.URL + '/book/remove' + id, {withCredentials: true});
  }
}
