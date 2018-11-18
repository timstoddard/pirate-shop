import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Movie } from 'src/app/store/models/movie.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() movie: Movie;
  @Output() quantityUpdated = new EventEmitter();
  @Output() movieRemoved = new EventEmitter();

  updateQuantity($event: any) {
    const quantity = parseInt($event.srcElement.value, 10);
    this.quantityUpdated.emit({
      movieId: this.movie.id,
      quantity,
    });
  }

  removeMovie() {
    this.movieRemoved.emit(this.movie.id);
  }
}
