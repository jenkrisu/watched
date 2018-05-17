import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MovieComponent } from './movie.component';

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule
  ],
  declarations: [
    MoviesComponent,
    MovieComponent
  ]
})
export class MoviesModule { }
