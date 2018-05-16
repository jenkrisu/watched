import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';


import * as api from './api';
import { Result } from './result.interface';

import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }

  searchMovies(query: string, page: number = 1): Observable<HttpResponse<Result>> {
    const url = api.URL + '/3/search/movie?';
    const params = new HttpParams()
      .set('api_key', api.KEY)
      .set('query', query)
      .set('page', page.toString());
    return this.httpClient.jsonp<HttpResponse<Result>>(url + params.toString(), 'callback');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable('Something bad happened; please try again later.');
  }

}
