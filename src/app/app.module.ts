import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MoviesModule } from './movies/movies.module';
import { TvShowsModule } from './tv-shows/tv-shows.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PopularComponent } from './popular/popular.component';

import { SearchService } from './search.service';
import { AuthService } from './auth.service';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    HomeComponent,
    SearchComponent,
    PopularComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MoviesModule,
    TvShowsModule,
    AppRoutingModule
  ],
  providers: [SearchService, AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
