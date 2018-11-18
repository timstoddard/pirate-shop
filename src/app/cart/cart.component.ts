import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Movie } from '../store/models/movie.model';
import { RemoveMovie, UpdateQuantity } from '../store/actions/movie.actions';
import movies from '../movie-list/movies';
import { AppState } from '../app.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy {
  allMovies = movies;
  movies$: Observable<Movie[]>;
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {
    this.movies$ = this.store.pipe(
      takeUntil(this.unsubscribe),
      select('movies'));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }

  updateQuantity($event: any) {
    const { movieId, quantity } = $event;
    if (quantity > 0) {
      this.store.dispatch(new UpdateQuantity({ movieId, quantity }));
    }
  }

  removeMovie(movieId: number) {
    this.store.dispatch(new RemoveMovie(movieId));
  }

  getItemCount(moviesInCart: Movie[]) {
    return moviesInCart.reduce(
      (prev: number, curr: Movie) => prev + curr.quantity,
      0);
  }

  getTotal(moviesInCart: Movie[]) {
    return moviesInCart.reduce(
      (prev: number, curr: Movie) => prev + curr.quantity * curr.price,
      0);
  }
}
