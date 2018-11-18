// import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
export enum ActionTypes {
  ADD_MOVIE = 'Add Movie',
  REMOVE_MOVIE = 'Remove Movie',
  UPDATE_QUANTITY = 'Update Quantity',
}

export class AddMovie implements Action {
  readonly type = ActionTypes.ADD_MOVIE;

  constructor(public payload: number) {}
}

export class RemoveMovie implements Action {
  readonly type = ActionTypes.REMOVE_MOVIE;

  constructor(public payload: number) {}
}

export interface UpdateQuantityPayload {
  movieId: number;
  quantity: number;
}

export class UpdateQuantity implements Action {
  readonly type = ActionTypes.UPDATE_QUANTITY;

  constructor(public payload: UpdateQuantityPayload) {}
}

export type Actions = AddMovie | RemoveMovie | UpdateQuantity;
