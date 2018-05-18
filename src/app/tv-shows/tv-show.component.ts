import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { TvShowDetails } from './tv-show-details.interface';
import { AuthService } from '../auth.service';
import { ListService } from '../list.service';
import { IMG_BIG, BG_MEDIUM } from '../api';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss']
})
export class TvShowComponent implements OnInit {

  userId: number;
  loggedIn: boolean;
  loading = false;
  error = '';
  bg = BG_MEDIUM;
  img = IMG_BIG;
  tv: TvShowDetails = {};

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
      this.searchService.tv(params['id']).subscribe(
        response => {
          this.loading = false;
          this.tv = response.body;
        },
        error => {
          this.loading = false;
          this.error = error;
        });
    });
  }

  addToList(list: string, id: number) {
    console.log(id);
    this.listService.addToList(list, 'tv', this.userId, id, true).subscribe(
      response => {
      },
      error => {
      }
    );
  }

}
