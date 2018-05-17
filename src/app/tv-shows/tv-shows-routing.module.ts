import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvShowsComponent } from './tv-shows.component';
import { SearchComponent } from '../search/search.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { PopularComponent } from '../popular/popular.component';
import { TvShowComponent } from './tv-show.component';

const routes: Routes = [
  { path: 'tvshows', component: TvShowsComponent, children: [
    { path: '', redirectTo: 'popular', pathMatch: 'full' },
    { path: 'popular', component: PopularComponent },
    { path: 'search', component: SearchComponent },
    { path: 'tvshow/:id', component: TvShowComponent},
    { path: '**', component: NotFoundComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowsRoutingModule { }
