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

  getTotalBeforeDiscounts() {
    return this.movies.reduce(getTotalPrice, 0);
  }

  getTotalBeforeBulkDiscount() {
    const rawTotal = this.getTotalBeforeDiscounts();
    const DVDDiscount = this.addedAllDVDs()
      ? this.getDVDDiscount()
      : 0;
    const BluRayDiscount = this.addedAllBluRays()
      ? this.getBluRayDiscount()
      : 0;
    const discount = DVDDiscount + BluRayDiscount;
    return rawTotal - discount;
  }

  getTotal() {
    const rawTotal = this.getTotalBeforeBulkDiscount();
    const bulkDiscount = this.hasBulkDiscount()
      ? this.getBulkDiscount()
      : 0;
      return rawTotal - bulkDiscount;
  }

  addedAllDVDs() {
    const dvds = this.movies.filter(movie => movie.type === 'DVD');
    return dvds.length === 3;
  }

  addedAllBluRays() {
    const blurays = this.movies.filter(movie => movie.type === 'Blu-Ray');
    return blurays.length === 3;
  }

  hasBulkDiscount() {
    return this.getItemCount() >= 100;
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

  getBulkDiscount() {
    return this.getTotalBeforeBulkDiscount() * 0.05;
  }
}
