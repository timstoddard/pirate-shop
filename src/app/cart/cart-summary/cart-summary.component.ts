import { Component, Input } from '@angular/core';

import { Movie } from 'src/app/store/models/movie.model';

const getTotalPrice = (prev: number, curr: Movie) =>
  prev + curr.quantity * curr.price;

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  @Input() movies: Movie[];

  getItemCount() {
    return this.movies
      .reduce((prev: number, curr: Movie) => prev + curr.quantity, 0);
  }

  getTotal() {
    const rawTotal = this.movies.reduce(getTotalPrice, 0);
    const DVDDiscount = this.addedAllDVDs()
      ? this.getDVDDiscount()
      : 0;
    const BluRayDiscount = this.addedAllBluRays()
      ? this.getBluRayDiscount()
      : 0;
    const discount = DVDDiscount + BluRayDiscount;
    return rawTotal - discount;
  }

  addedAllDVDs() {
    const dvds = this.movies.filter(movie => movie.type === 'DVD');
    return dvds.length === 3;
  }

  addedAllBluRays() {
    const blurays = this.movies.filter(movie => movie.type === 'Blu-Ray');
    return blurays.length === 3;
  }

  getDVDDiscount() {
    const DVDsTotalPrice = this.movies
      .filter(movie => movie.type === 'DVD')
      .reduce(getTotalPrice, 0);
    return DVDsTotalPrice * 0.1;
  }

  getBluRayDiscount() {
    const BluRaysTotalPrice = this.movies
      .filter(movie => movie.type === 'Blu-Ray')
      .reduce(getTotalPrice, 0);
    return BluRaysTotalPrice * 0.15;
  }
}
