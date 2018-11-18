import { Action, State } from '@ngrx/store';

import { Movie } from '../models/movie.model';
import { ActionTypes, AddMovie, RemoveMovie, UpdateQuantity } from '../actions/movie.actions';
import movies from 'src/app/movie-list/movies';

export function moviesReducer(state: Movie[] = [], action: Action) {
  switch (action.type) {
    case ActionTypes.ADD_MOVIE:
      const { payload: addId } = (action as AddMovie);
      const movieToAdd = Object.assign({},
        movies.find(movie => movie.id === addId));
      return addMovie(state, movieToAdd);
    case ActionTypes.REMOVE_MOVIE:
      const { payload: removeId } = (action as RemoveMovie);
      return state.filter(movie => movie.id !== removeId);
    case ActionTypes.UPDATE_QUANTITY:
      const { payload } = (action as UpdateQuantity);
      return updateQuantity(state, payload.movieId, payload.quantity);
    default:
      return state;
  }
}

export interface State {
  movies: Movie[];
}

// adds a movie to the list if it's not there, otherwise increments the quantity
// of that movie by 1
const addMovie = (state: Movie[], movieToAdd: Movie) => {
  const newState = [...state];
  for (let i = 0; i < newState.length; i++) {
    const movie = newState[i];
    if (movie.id === movieToAdd.id) {
      movie.quantity++;
      return newState;
    }
  }
  return [...state, movieToAdd];
};

// updates the quantity of the movie with the given id
const updateQuantity = (state: Movie[], movieId: number, quantity: number) => {
  const newState = [...state];
  for (let i = 0; i < newState.length; i++) {
    const movie = newState[i];
    if (movie.id === movieId) {
      movie.quantity = quantity;
      return newState;
    }
  }
  return newState;
};
