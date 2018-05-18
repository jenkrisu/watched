import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { Subject } from 'rxjs/subject';
import { CookieService } from 'ngx-cookie-service';


import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.interface';
import * as api from './api';

export interface Session {
  session_id: string;
  success: boolean;
}

export interface Token {
  success: boolean;
  expires_at: string;
  request_token: string;
}

@Injectable()
export class AuthService {

  loggedIn = new Subject<boolean>();
  user = new Subject<User>();

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  hasSession(): boolean {
    return this.cookieService.check('session');
  }

  hasToken(): boolean {
    return this.cookieService.check('token');
  }

  setSession(id: string) {
    this.cookieService.set('session', id);
    this.loggedIn.next(true);
  }

  removeSession() {
    this.cookieService.delete('session');
    this.cookieService.delete('token');
    this.loggedIn.next(false);
  }

  session(): Observable<HttpResponse<Session>> {
    const url = api.URL + '/3/authentication/session/new';

    const params = new HttpParams()
    .set('api_key', api.KEY)
    .set('request_token', this.cookieService.get('token'));

    return this.httpClient
      .get<Session>(url, {params, observe: 'response'})
      .pipe(catchError(this.requestExpired));
  }

  account(): Observable<HttpResponse<User>> {
    const url = api.URL + '/3/account';

    const params = new HttpParams()
      .set('api_key', api.KEY)
      .set('session_id', this.cookieService.get('session'));

    return this.httpClient
      .get<User>(url, {params, observe: 'response'})
      .pipe(catchError(this.sessionExpired));
  }

  token(): Observable<HttpResponse<Token>> {
    const url = api.URL + '/3/authentication/token/new';

    const params = new HttpParams()
      .set('api_key', api.KEY);

    return this.httpClient
      .get<Token>(url, {params, observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  setToken(token: Token) {
    this.cookieService.set('token', token.request_token);
    window.location.href = api.AUTH + token.request_token + api.REDIR;
  }

  private handleError(error: HttpErrorResponse) {
    return new ErrorObservable('Unfortunately an error occurred. Please try again later.');
  }

  private sessionExpired(error: HttpErrorResponse) {
    return new ErrorObservable('Session has expired. Please login to continue.');
  }

  // Should check token expiration to avoid this...
  private requestExpired(error: HttpErrorResponse) {
    return new ErrorObservable('Login process has expired. Please login again.');
  }

}
