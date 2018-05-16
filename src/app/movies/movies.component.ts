import { Component, OnInit } from '@angular/core';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  onKey(event: any) {
    const query = event.target.value;
    this.searchService.searchMovies(query).subscribe(
      response => {
      
        console.log(response);

      }
    );
  }

}
