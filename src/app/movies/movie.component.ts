import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { MovieDetails } from './movie-details.interface';

import { IMG_BIG, BG_MEDIUM } from '../api';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  loading = false;
  error = '';
  bg = BG_MEDIUM;
  img = IMG_BIG;
  movie: MovieDetails = {};

  constructor(private route: ActivatedRoute,
    private searchService: SearchService) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.searchService.movie(params['id']).subscribe(
        response => {
          this.loading = false;
          this.movie = response.body;
        },
        error => {
          this.loading = false;
          this.error = error;
        });
    });
  }

}
