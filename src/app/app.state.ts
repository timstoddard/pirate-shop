import { Movie } from './store/models/movie.model';

export interface AppState {
  readonly movies: Movie[];
}
