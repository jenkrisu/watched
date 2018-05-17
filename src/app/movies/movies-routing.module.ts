import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { SearchComponent } from '../search/search.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { PopularComponent } from '../popular/popular.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent, children: [
    { path: '', component: PopularComponent },
    { path: 'popular', component: PopularComponent },
    { path: 'search', component: SearchComponent },
    { path: '**', component: NotFoundComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
