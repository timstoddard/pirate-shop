import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { moviesReducer } from './store/reducers/movie.reducer';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    CartComponent,
    CartItemComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ movies: moviesReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
