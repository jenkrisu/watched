import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvShowsComponent } from './tv-shows.component';
import { SearchComponent } from '../search/search.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {  path: 'tvshows', component: TvShowsComponent, children: [
    { path: '', component: NotFoundComponent },
    { path: 'search', component: SearchComponent },
    { path: '**', component: NotFoundComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowsRoutingModule { }
