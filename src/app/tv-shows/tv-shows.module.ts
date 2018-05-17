import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsComponent } from './tv-shows.component';
import { TvShowComponent } from './tv-show.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TvShowsRoutingModule
  ],
  declarations: [TvShowsComponent, TvShowComponent]
})
export class TvShowsModule { }
