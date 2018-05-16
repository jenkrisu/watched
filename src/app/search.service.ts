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

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return new ErrorObservable('Unfortunately an error occurred. Please try again later.');
  }

}
