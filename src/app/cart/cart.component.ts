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

  // called when the checkout button is clicked; if this were a real web app, it
  // would probably initiate a POST request to send the cart details to the server
  checkout() {
    console.log('checkout');
  }

  // dispatches an action to the global store to update the quantity of a movie
  updateQuantity($event: any) {
    const { movieId, quantity } = $event;
    if (quantity > 0) {
      this.store.dispatch(new UpdateQuantity({ movieId, quantity }));
    }
  }

  // dispatches an action to the global store to remove a movie from the cart
  removeMovie(movieId: number) {
    this.store.dispatch(new RemoveMovie(movieId));
  }
}
