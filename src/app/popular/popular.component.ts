import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../search.service';
import { Result } from '../result.interface';
import { Movie } from '../movies/movie.interface';
import { TvShow } from '../tv-shows/tv-show.interface';

import { IMG_SMALL } from '../api';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  type: 'tv' | 'movie';
  img = IMG_SMALL;

  total_results = 0;
  results: Movie[] = [];
  page = 1;
  loading = false;
  maxSize = 10;
  itemsPerPage = 20;

  error = '';

  constructor(private router: Router,
    private searchService: SearchService) { }

  ngOnInit() {
    if (this.router.url === '/movies' || this.router.url === '/movies/popular') {
      this.type = 'movie';
      this.loadResults();
    } else if (this.router.url === '/tvshows' || this.router.url === '/tvshows/popular') {
      this.type = 'tv';
      this.loadResults();
    }
  }

  loadResults() {
    this.error = '';
    this.loading = true;
    this.searchService.popular(this.type)
    .do(() => this.loading = false )
    .subscribe(
      response => {
        this.loading = false;
        this.setResults(response);
      },
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }

  refresh(event) {
    event.preventDefault();
    this.loadResults();
  }

  getPage(page: number) {
    this.error = '';
    this.results = [];
    this.loading = true;
    this.page = page;
    this.searchService
    .popular(this.type, page)
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
  }

  getYear(string: string) {
    return string.slice(0, string.indexOf('-'));
  }
}
