import { Injectable } from '@angular/core';
import {API_URL} from '../../config';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  URL = API_URL + '/api/v1/image';

  constructor(private http: HttpClient) {
  }

  async getImageByName(name: string) {
    return await this.http.get<any>(this.URL + '/getOne/' + name, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  uploadImage(item: any): Observable<any> {
    return this.http.post<any>(this.URL + '/upload', item, { withCredentials: true })
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
