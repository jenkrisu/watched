import { Injectable } from '@angular/core';
import * as api from './api';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }

  movies(query: string) {
  }

}
