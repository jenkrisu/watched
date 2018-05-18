import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import * as api from './api';
import { Result } from './result.interface';
import { MovieDetails } from './movies/movie-details.interface';

import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }

  // Search movies or tv shows
  search(type: 'movie' | 'tv', query: string, page: number = 1): Observable<HttpResponse<Result>> {
    const url = api.URL + '/3/search/' + type;

    const params = new HttpParams()
      .set('api_key', api.KEY)
      .set('query', query)
      .set('page', page.toString());

    return this.httpClient
      .get<Result>(url, {params, observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  // Get most popular movies or tv shows
  popular(type: 'movie' | 'tv', page: number = 1): Observable<HttpResponse<Result>> {
    const url = api.URL + '/3/' + type + '/popular';

    const params = new HttpParams()
    .set('api_key', api.KEY)
    .set('page', page.toString());

    return this.httpClient
      .get<Result>(url, {params, observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  // Get movie
  movie(id: string): Observable<HttpResponse<MovieDetails>> {
    const url = api.URL + '/3/movie/' + id;

    const params = new HttpParams()
    .set('api_key', api.KEY);

    return this.httpClient
      .get<MovieDetails>(url, {params, observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return new ErrorObservable('Unfortunately an error occurred. Please try again later.');
  }

}
