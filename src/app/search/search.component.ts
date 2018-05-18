
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { SearchService } from '../search.service';
import { Result } from '../result.interface';
import { Movie } from '../movies/movie.interface';
import { TvShow } from '../tv-shows/tv-show.interface';

import { IMG_SMALL } from '../api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  type: 'movie' | 'tv';
  searchText = 'Type to search...';
  img = IMG_SMALL;

  total_results = 0;
  results: Movie[] | TvShow[] = [];
  page = 1;
  loading = false;
  maxSize = 10;
  itemsPerPage = 20;

  error = '';
  noResults = false;
  query = new FormControl();

  constructor(private router: Router,
    private searchService: SearchService) { }

  ngOnInit() {

    if (this.router.url === '/movies/search') {
      this.type = 'movie';
      this.searchText = 'Type to search movies...';
    } else if (this.router.url === '/tvshows/search') {
      this.type = 'tv';
      this.searchText = 'Type to search TV shows...';
    }

    // Subscribe to search query changes but limit sending requests on every value change
    this.query.valueChanges
    .debounceTime(500)
    .filter(query => query.length > 0)
    .distinctUntilChanged()
    .do(() => this.emptyResults())
    .do(() => this.loading = true)
    // SwitchMap: "flattening operator", cancels previous inner observable and subscribes to the new one
    .switchMap(query => this.searchService.search(this.type, query))
    .do(() => this.loading = false )
    .subscribe(
      response => {
        this.setResults(response);
      },
      error => {
        this.error = error;
      }
    );
  }

  getPage(page: number) {
    this.error = '';
    this.noResults = false;
    this.results = [];
    this.loading = true;
    this.page = page;
    this.searchService
    .search(this.type, this.query.value, page)
    .subscribe(
      response => {
        this.loading = false;
        this.setResults(response);
      },
      error => {
        this.loading = false;
        this.error = error;
      });
  }

  setResults(response: any) {
    // API can fetch info from 1000 pages only, check that max 1000 pages are shown
    if (response.body.total_pages <= 1000) {
      this.total_results = response.body.total_results;
    } else {
      this.total_results = 1000 * this.itemsPerPage;
    }
    this.results = response.body.results;
    if (this.results.length === 0) {
      this.noResults = true;
    }
  }

  emptyResults() {
      this.error = '';
      this.noResults = false;
      this.total_results = 0;
      this.results = [];
  }

  getYear(string: string) {
    return string.slice(0, string.indexOf('-'));
  }

}
