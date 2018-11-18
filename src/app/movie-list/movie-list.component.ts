import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { AddMovie } from '../store/actions/movie.actions';
import movies from './movies';
import { AppState } from '../app.state';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnDestroy {
  allMovies = movies;
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }

  // dispatches an action to the global store to add a movie to the cart
  addMovie(movieId: number) {
    this.store.dispatch(new AddMovie(movieId));
  }
}
