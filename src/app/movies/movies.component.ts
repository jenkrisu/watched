import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { SearchService } from '../search.service';
import { Result } from '../result.interface';
import { Movie } from './movie.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  total_results = 0;
  results: Movie[] = [];
  page = 1;
  loading = false;

  error = '';
  query = new FormControl();

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    // Subscribe to search query changes but limit sending requests on every value change
    this.query.valueChanges
    .debounceTime(500)
    .filter(query => query.length > 0)
    .distinctUntilChanged()
    .do(() => this.emptyResults())
    .do(() => this.loading = true)
    // SwitchMap: "flattening operator", cancels previous inner observable and subscribes to the new one
    .switchMap(query => this.searchService.search('movie', query))
    .do(() => this.loading = false )
    .subscribe(
      response => {
        this.total_results = response.body.total_results;
        this.results = response.body.results;
        console.log(response.body.results);
      },
      error => {
        this.error = error;
      }
    );
  }

  getPage(page: number) {
    this.error = '';
    this.results = [];
    this.loading = true;
    this.page = page;
    this.searchService
    .search('movie', this.query.value, page)
    .subscribe(
      response => {
        this.loading = false;
        this.total_results = response.body.total_results;
        this.results = response.body.results;
        console.log(response.body.results);
      },
      error => {
        this.loading = false;
        this.error = error;
      });
  }

  emptyResults() {
      this.error = '';
      this.total_results = 0;
      this.results = [];
  }

}
