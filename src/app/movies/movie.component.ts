import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { MovieDetails } from './movie-details.interface';
import { AuthService } from '../auth.service';
import { ListService } from '../list.service';
import { IMG_BIG, BG_MEDIUM } from '../api';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  userId: number;
  loggedIn: boolean;
  loading = false;
  error = '';
  bg = BG_MEDIUM;
  img = IMG_BIG;
  movie: MovieDetails = {};

  constructor(private route: ActivatedRoute,
    private searchService: SearchService,
    private listService: ListService,
    private authService: AuthService) { }

  ngOnInit() {

    this.authService.loggedIn.subscribe(
      value => {
        this.loggedIn = value;
      }
    );

    this.authService.user.subscribe(
      value => {
        this.userId = value.id;
      }
    );

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

  addToList(list: string, id: number) {
    console.log(id);
    this.listService.addToList(list, 'movie', this.userId, id, true).subscribe(
      response => {
      },
      error => {
      }
    );
  }

}
