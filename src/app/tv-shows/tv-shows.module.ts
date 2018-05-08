import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsComponent } from './tv-shows.component';

@NgModule({
  imports: [
    CommonModule,
    TvShowsRoutingModule
  ],
  declarations: [TvShowsComponent]
})
export class TvShowsModule { }
