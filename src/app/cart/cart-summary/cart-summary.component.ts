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
  @Input() movies: Movie[] = [];

  // returns a count of how many items are in the cart
  getItemCount() {
    return this.movies
      .reduce((prev: number, curr: Movie) => prev + curr.quantity, 0);
  }

  // returns the cart total cost, before any discounts
  getTotalBeforeDiscounts() {
    return this.movies.reduce(getTotalPrice, 0);
  }

  // returns the cart total cost, before just the bulk discount
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

  // returns the cart total cost, after all discounts
  getTotal() {
    const rawTotal = this.getTotalBeforeBulkDiscount();
    const bulkDiscount = this.hasBulkDiscount()
      ? this.getBulkDiscount()
      : 0;
      return rawTotal - bulkDiscount;
  }

  // returns true if the customer has added all the DVDs, otherwise false
  addedAllDVDs() {
    const dvds = this.movies.filter(movie => movie.type === 'DVD');
    return dvds.length === 3;
  }

  // returns true if the customer has added all the Blu-Rays, otherwise false
  addedAllBluRays() {
    const blurays = this.movies.filter(movie => movie.type === 'Blu-Ray');
    return blurays.length === 3;
  }

  // returns true if the customer has added at least 100 movies to their cart
  hasBulkDiscount() {
    return this.getItemCount() >= 100;
  }

  // returns the total discount for adding all the DVDs
  getDVDDiscount() {
    const DVDsTotalPrice = this.movies
      .filter(movie => movie.type === 'DVD')
      .reduce(getTotalPrice, 0);
    return DVDsTotalPrice * 0.1;
  }

  // returns the total discount for adding all the Blu-Rays
  getBluRayDiscount() {
    const BluRaysTotalPrice = this.movies
      .filter(movie => movie.type === 'Blu-Ray')
      .reduce(getTotalPrice, 0);
    return BluRaysTotalPrice * 0.15;
  }

  // returns the total bulk discount
  getBulkDiscount() {
    return this.getTotalBeforeBulkDiscount() * 0.05;
  }
}
