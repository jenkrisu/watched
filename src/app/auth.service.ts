import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import * as api from './api';
import { Token } from './token.interface';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  getToken(): Observable<HttpResponse<Token>> {
    const url = api.URL + '/3/authentication/token/new';

    const params = new HttpParams()
      .set('api_key', api.KEY);

    return this.httpClient
      .get<Token>(url, {params, observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  setToken(token: Token) {
    document.cookie = 'token=' + token.request_token + '; expires=' + token.expires_at + '; path=/';
    window.location.href = api.AUTH + token.request_token + api.REDIR;
  }

  private handleError(error: HttpErrorResponse) {
    return new ErrorObservable('Unfortunately an error occurred. Please try again later.');
  }

}
