import { Movie } from './movies/movie.interface';

export interface Result {
    page?: number;
    results?: Movie[];
    total_results?: number;
    total_pages?: number;
}
