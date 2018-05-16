import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MoviesRoutingModule
  ],
  declarations: [MoviesComponent]
})
export class MoviesModule { }
