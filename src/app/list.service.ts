import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import * as api from './api';
import { Result } from './result.interface';

import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse,  } from '@angular/common/http';

export interface Item {
  media_type: string;
  media_id: string;
  listName: boolean;
}

@Injectable()
export class ListService {

  constructor(private httpClient: HttpClient,
  private cookieService: CookieService) {
  }

  // Favorite or add to watchlist movie or tv show
  addToList(list: string, media_type: 'movie' | 'tv', user_id: number, media_id: number, add: boolean): Observable<HttpResponse<any>> {
    const url = api.URL + '/3/account/' + user_id + '/' + list;

    const params = new HttpParams()
      .set('api_key', api.KEY)
      .set('session_id', this.cookieService.get('session'));

    const favorite = { media_type: media_type, media_id: media_id, [list]: add} ;

    return this.httpClient
      .post<Item>(url, favorite, {params, observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return new ErrorObservable('Unfortunately an error occurred. Please try again later.');
  }

}
