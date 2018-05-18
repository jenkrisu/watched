import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { TvShowDetails } from './tv-show-details.interface';

import { IMG_BIG, BG_MEDIUM } from '../api';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss']
})
export class TvShowComponent implements OnInit {

  loading = false;
  error = '';
  bg = BG_MEDIUM;
  img = IMG_BIG;
  tv: TvShowDetails = {};

  constructor(private route: ActivatedRoute,
    private searchService: SearchService) { }

  ngOnInit() {
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

}
