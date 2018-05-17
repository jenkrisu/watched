import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { SearchComponent } from '../search/search.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { PopularComponent } from '../popular/popular.component';
import { MovieComponent } from './movie.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent, children: [
    { path: '', redirectTo: 'popular', pathMatch: 'full' },
    { path: 'popular', component: PopularComponent },
    { path: 'search', component: SearchComponent },
    { path: 'movie/:id', component: MovieComponent},
    { path: '**', component: NotFoundComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
